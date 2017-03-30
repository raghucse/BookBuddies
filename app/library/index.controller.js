/*(function () {
    'use strict';

    angular
        .module('app')
        .controller('Library.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.book = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        vm.saveBook = saveBook;
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function saveBook() {
            var temp=JSON.parse(JSON.stringify(vm.book));
            vm.user.book[temp.name] = temp;
            UserService.addBook(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Library.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.book = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        vm.saveBook = saveBook;
        vm.change = change;
        vm.changes = changes;
        vm.del = del;
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;

            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function saveBook() {
            var temp=JSON.parse(JSON.stringify(vm.book));
            temp.lent = "Lend";
            temp.lentname = "";
            vm.user.book[temp.name] = temp;
            UserService.addBook(vm.user)
                .then(function () {
                    FlashService.Success('Library updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }

        function del(y) {
            console.log(y);
            delete vm.user.book[y.name];
            UserService.addBook(vm.user)
                .then(function () {
                    FlashService.Success('Library updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function change(x) {
            console.log(x);
            if (x.lent==="Lend") x.lent = "Take Back";
            else x.lent = "Lend";

            if (x.lent==="Lend") x.lentname="";
            UserService.addBook(vm.user)
                .then(function () {
                    FlashService.Success('Library updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function changes(x, uzserName) {
            console.log(x);
            console.log(uzserName);
        }

    }

})();
/*
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Library.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.book = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        vm.saveBook = saveBook;
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function saveBook() {
            var temp=JSON.parse(JSON.stringify(vm.book));
            vm.user.book[temp.name] = temp;
            UserService.addBook(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();
*/

