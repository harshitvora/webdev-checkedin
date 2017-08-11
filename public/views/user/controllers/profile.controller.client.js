(function () {
    angular
        .module("CheckedIn")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, $rootScope) {
        var model = this;

        //Event handles:
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

        function logout() {
            if($rootScope.currentUser){
                delete $rootScope.currentUser;
            }
            $location.url("/login");
        }
    }
})();
