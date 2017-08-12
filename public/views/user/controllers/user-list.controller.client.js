(function () {
    angular
        .module("CheckedIn")
        .controller("userListController", userListController);

    function userListController($routeParams, userService, $location, $rootScope, user) {
        var model = this;

        //Event handles:
        model.logout = logout;

        var userId = user._id;

        function init() {
            userService.getAllUsers()
                .then(function (response) {
                    model.users = response;
                });
            $rootScope.title = "Search users";
        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }
    }
})();
