/**
 * Created by harsh on 8/17/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("adminHomeController", adminHomeController);

    function adminHomeController($routeParams, $route, userService, venueService, reviewService, notificationService, $location, $rootScope, user) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.deleteUser = deleteUser;

        var userId = user._id;
        function init() {

            userService.findUserByUserId(userId)
                .then(function (user) {
                    model.user = user;
                    userService.getAllUsers()
                        .then(function (response) {
                            model.users = response;
                        });
                });

            $rootScope.title = "Admin";

        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (response) {
                    $route.reload();
                });

        }
    }
})();

