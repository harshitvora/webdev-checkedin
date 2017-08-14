(function () {
    angular
        .module("CheckedIn")
        .controller("userController", userController);

    function userController($routeParams, userService, venueService, $location, $rootScope, user) {
        var model = this;

        //Event handles:
        model.logout = logout;

        var userId = user._id;

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                });
            $rootScope.title = "Your profile";
            userService.findFollowingForUser(userId)
                .then(function (response) {
                    model.following = response;
                });

            venueService.findVenuesForUser(userId)
                .then(function (response) {
                    console.log(response);
                    model.bookmark = response;
                });
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
