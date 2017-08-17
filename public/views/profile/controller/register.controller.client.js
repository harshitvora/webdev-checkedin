(function () {
    angular
        .module("CheckedIn")
        .controller("registerController", registerController)

    function registerController($location, userService, $rootScope) {
        var model = this;

        //Event handles:
        model.register = register;

        function init() {
            $rootScope.title = "Register";
        }
        init();

        function register(user) {
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    _user = response;
                    if(!_user){
                        if(user.password === user.verifyPassword){
                            var newUser = {username: user.username, password: user.password, role:"USER"};
                            return userService.createUser(newUser);
                        }
                        else {
                            model.error = "Passwords do not match!";
                        }
                    }
                    else{
                        model.error = "User already exists!";
                    }
                    return;
                })
                .then(function (response) {
                    newUser = response;
                    if(newUser){
                        login(newUser);
                    }
                    return;
                });
        }

        function login(user) {
            userService.login(user.username, user.password)
                .then(function (response) {
                    var _user = response;
                    if(!_user){
                        model.errorMessage = "Wrong username or password!";
                    }
                    else {
                        $rootScope.currentUser = _user;
                        $location.url("user/");
                    }
                });

        }
    }
})();
