(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.addBook = addBook;
        service.getBooks = getBooks;
        service.UpdateMessage = UpdateMessage;

        return service;

        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }

        function UpdateMessage(user) {
            return $http.put('/api/users/msg/' + user._id, user).then(handleSuccess, handleError);
        }

        function addBook(user) {

            return $http.post('/api/users/current/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }


        function getBooks(user) {
            //console.log(user);
            return $http.get('/api/users/search', user).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            console.log(res.data);
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
