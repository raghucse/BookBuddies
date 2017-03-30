var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');

var connectionString = config.connectionString;
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.searchBooks = searchBooks;
service.updateMessage=updateMessage;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            //console.log(user);
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function searchBooks(userParam) {
   var deferred = Q.defer();

    db.users.find().toArray(function(err, arr) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (arr){
            console.log(arr);
            deferred.resolve(arr);
        } else {
            // user not found
            deferred.resolve();
        }

    });
    //   console.log("service: "+ result);
    //   return result;
    return deferred.promise;
   // var deferred = Q.defer();
  //  var bands = db.users.find({});

    /*
    bands.each(function(err, band) {
        console.log(band);
    });*/
/*
    if(bands) {
    //        deferred.resolve(bands);
    }
    return bands;*/
   // return deferred.promise;
}


function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
              //  console.log(user);
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        var book=new Map();
        user.book=book;
        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var exbook;
        db.users.findOne(
            { username: userParam.username },
            function (err, user) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                //console.log(user);
                /*exbook = user.book;
                if(exbook == null)
                {
                    exbook = new Map();
                }
                exbook[userParam.book.name]= userParam.book;*/
                var set = {
                    firstName: userParam.firstName,
                    lastName: userParam.lastName,
                    username: userParam.username,
                    book:userParam.book,
                };

                // update password if it was entered
                if (userParam.password) {
                    set.hash = bcrypt.hashSync(userParam.password, 10);
                }

                db.users.update(
                    { _id: mongo.helper.toObjectID(_id) },
                    { $set: set },
                    function (err, doc) {
                        if (err) deferred.reject(err.name + ': ' + err.message);

                        deferred.resolve();
                    });
            });

        /*if(exbook==undefined)
        {
            exbook=new Map();
        }
        console.log(userParam.book);
        */


    }

    return deferred.promise;
}



function updateMessage(_id, userParam) {
    var deferred = Q.defer();

    updateUser();

    function updateUser() {
        // fields to update
        var exbook;
        db.users.findOne(
            { username: userParam.username },
            function (err, user) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                //console.log(user);
                /*exbook = user.book;
                 if(exbook == null)
                 {
                 exbook = new Map();
                 }
                 exbook[userParam.book.name]= userParam.book;*/
                var set = {
                    firstName: userParam.firstName,
                    lastName: userParam.lastName,
                    username: userParam.username,
                    message:userParam.message,
                    book:userParam.book,
                };

                // update password if it was entered
                if (userParam.password) {
                    set.hash = bcrypt.hashSync(userParam.password, 10);
                }

                db.users.update(
                    { _id: mongo.helper.toObjectID(_id) },
                    { $set: set },
                    function (err, doc) {
                        if (err) deferred.reject(err.name + ': ' + err.message);

                        deferred.resolve();
                    });
            });

        /*if(exbook==undefined)
         {
         exbook=new Map();
         }
         console.log(userParam.book);
         */


    }

    return deferred.promise;
}


function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}