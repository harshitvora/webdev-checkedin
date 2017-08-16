(function () {
    angular
        .module("CheckedIn")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, reviewService, $location, $rootScope) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;
        model.toFollow = toFollow;
        model.toReview = toReview;

        var userId = $routeParams["uid"];
        var currentUser;



        function init() {
            model.currentTab = "REVIEW";


            model.followed = false;
            userService.loggedin()
                .then(function (user) {
                    if(user == 0){
                        currentUser = null;
                    } else {
                        currentUser = user;
                        if(currentUser._id == userId){
                            $location.url("/user");
                        }
                        if(currentUser.following.includes(userId)){
                            model.followed = true;
                        }
                    }
                });

            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                    $rootScope.title = response.username+"'s profile";
                });

            userService.findFollowingForUser(userId)
                .then(function (response) {
                    model.following = response;
                });

            reviewService.findReviewsForUser(userId)
                .then(function (response) {
                    model.review = response.reverse();
                });
        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function toFollow() {
            model.currentTab = "FOLLOW";
        }

        function toReview() {
            model.currentTab = "REVIEW";
        }

        function followUser() {
            if(!currentUser){
                alert("Login to perform this action!");
            } else {
                userService.followUser(currentUser._id, userId)
                    .then(function (response) {
                        console.log(response);
                        model.followed = true;
                    });
            }
        }

        function unfollowUser() {
            userService.unfollowUser(currentUser._id, userId)
                .then(function (response) {
                    console.log(response);
                    model.followed = false;
                });

        }
    }
})();
