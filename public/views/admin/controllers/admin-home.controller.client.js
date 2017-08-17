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
        model.deleteReview = deleteReview;
        model.unfollowUser = unfollowUser;
        model.removeFollower = removeFollower;

        var userId = user._id;
        function init() {

            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                });
            userService.getAllUsers()
                .then(function (response) {
                    model.users = response;
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

        function deleteReview(reviewId) {
            reviewService.deleteReview(reviewId)
                .then(function (response) {
                    $route.reload();
                });

        }

        function unfollowUser(followId) {
            userService.unfollowUser(userId, followId)
                .then(function (response) {
                    $route.reload();
                });

        }

        function removeFollower(followId) {
            userService.unfollowUser(followId, userId)
                .then(function (response) {
                    $route.reload();
                });
        }
    }
})();

