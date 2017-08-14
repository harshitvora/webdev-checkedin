(function () {
    angular
        .module("CheckedIn")
        .controller("followController", followController);

    function followController($routeParams, venueService, userService, $location, $rootScope, user) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.unfollowUser = unfollowUser;

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

        function unfollowUser(followId) {
            userService.unfollowUser(userId, followId)
                .then(function (response) {
                    $location.url("/user/following");
                });

        }
    }
})();
