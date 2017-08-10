(function () {
    angular.module("CheckedIn")
        .controller("homeController", homeController);

    function homeController($location, $rootScope){
        var model = this;

        // Event handles:
        model.logout = logout;

        function init() {
            $rootScope.title = "Home";

        }
        init();

        function logout() {
            if($rootScope.currentUser){
                delete $rootScope.currentUser;
                $location.url("/");
            }

        }
    }
})();