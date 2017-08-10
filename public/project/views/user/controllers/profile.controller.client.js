(function () {
    angular
        .module("CheckedIn")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, $rootScope) {
        var model = this;

        //Event handles:
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        var userId = $routeParams["uid"];

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                });
            $rootScope.title = "Profile";
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function (response) {
                    if(!response){
                        model.error = "Error updating profile!";
                    }
                    else{
                        model.successMessage = "Profile updated!";
                        $location.url("/user/"+user._id);
                    }
                });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (response) {
                    $location.url("/login");
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
