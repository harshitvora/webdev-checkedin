(function () {
    angular
        .module("CheckedIn")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        //Event handles:
        model.login = login;

        function init() {
            $rootScope.title = "Login";
        }
        init();

        function login(user) {
            userService.login(user.username, user.password)
                .then(function (response) {
                    var _user = response;
                    if(!_user){
                        model.errorMessage = "Wrong username or password!";
                    }
                    else {
                        if(_user.role === "ADMIN"){
                            $location.url("admin/");
                        } else {
                            $rootScope.currentUser = _user;
                            $location.url("user/");
                        }
                    }
                });

        }
    }
})();
