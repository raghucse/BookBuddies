(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.searchBooks=search;
        vm.sendMessage=sendMessage;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function search(){
        //    console.log(vm.user.query);
            UserService.getBooks(vm.user).then(function (user) {
                vm.res = user;
                var arr1=[]
                for (var i =0;i<vm.res.length;i++)
                {
                    if ((vm.user.query in vm.res[i].book))
                    {
                        if (vm.user.username!=vm.res[i].username && vm.user.city==vm.res[i].city)
                        arr1.push(vm.res[i]);
                    }
                }
                vm.res=arr1;
                console.log(vm.res);
            });

        }

        function sendMessage(x) {
            /*vm.message.from=vm.user.username;
            console.log(vm.message);

            if (!('message' in x))
            {
                x.message=[]
            }

            x.message.push(vm.message);
            UserService.UpdateMessage(x)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            console.log(x);
        */
        }

    }

})();