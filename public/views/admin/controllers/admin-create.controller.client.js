/**
 * Created by harsh on 8/17/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("adminCreateController", adminCreateController);

    function adminCreateController($location, userService, $rootScope) {
        var model = this;

        //Event handles:
        model.register = register;
        model.logout = logout;

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
                            var newUser = {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, role:"USER"};
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
                    $location.url("/admin")
                    return;
                });
        }

        function logout() {
            if($rootScope.currentUser){
                delete $rootScope.currentUser;
            }
            $location.url("/login");
        }
    }
})();
