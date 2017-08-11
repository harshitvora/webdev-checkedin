(function () {
    angular
        .module("CheckedIn")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, $rootScope) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;



        var userId = $routeParams["uid"];

        var currentUser;
        model.followed = false;
        userService.loggedin()
            .then(function (user) {
                if(user == 0){
                    currentUser = null;
                } else {
                    currentUser = user;
                    if(currentUser.following.includes(userId)){
                        model.followed = true;
                    }
                }
            });

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                    $rootScope.title = response.username+"'s profile";
                });

            // userService.findFollowingForUser(userId)
            //     .then(function (response) {
            //         model.following = response;
            //     });
        }
        init();

        function logout() {
            if($rootScope.currentUser){
                delete $rootScope.currentUser;
            }
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
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
