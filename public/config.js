(function () {
    angular
        .module("CheckedIn")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"})
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"})
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"})
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"})
            .when("/poc", {
                templateUrl: "views/poc/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"})
            .when("/poc/venue/:vid", {
                templateUrl: "views/poc/detail.view.client.html",
                controller: "detailController",
                controllerAs: "model"})
    }
})();
