(function () {
    'use strict';

    angular
        .module('app')
        .controller('Messages.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.book = null;
        vm.view_messages=view_messages;
        vm.textip=null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                view_messages(1);
            });
        }
    }

   function view_messages(k)
   {
       if(k==1){
           document.getElementById("msg").value = "Hi, I am interested in reading Harry Potter. Can I please borrow it" +
               " from 15th Feb to 1st March? Looking forward to hearing from you. Thanks.";
       }

       if(k==2){
           document.getElementById("msg").value = "Hi, how are you doing? I have heard a lot about Kane and Abel and " +
               "wanted to read. Is it possible that I borrow it from 20th Feb - 20th March? Thanks.";
       }
   }

})();