(function () {
    angular
        .module("CheckedIn")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, $rootScope, user) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;

        var userId = user._id;

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                });
            $rootScope.title = "Profile";
            userService.findFollowingForUser(userId)
                .then(function (response) {
                    model.following = response;
                });
        }
        init();

        function logout() {
            if($rootScope.currentUser){
                delete $rootScope.currentUser;
            }
            $location.url("/login");
        }

        function followUser(followId) {
            userService.followUser(userId, followId)
                .then(function (response) {
                    console.log(response);
                    $location.url("/user/"+userId+"/");
                });

        }

        function unfollowUser(followId) {
            userService.unfollowUser(userId, followId)
                .then(function (response) {
                    console.log(response);
                    $location.url("/user/"+userId+"/");
                });

        }
    }
})();
