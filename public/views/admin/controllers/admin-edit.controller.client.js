/**
 * Created by harsh on 8/17/2017.
 */

/**
 * Created by harsh on 8/10/2017.
 */
(function () {
    angular
        .module("CheckedIn")
        .controller("adminEditController", adminEditController);

    function adminEditController($routeParams, userService, $location, $rootScope, user) {
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
            $rootScope.title = "Edit Profile";
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
                        $location.url("/admin");
                    }
                });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (response) {
                    $location.url("/admin");
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

