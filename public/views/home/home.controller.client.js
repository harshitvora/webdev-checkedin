(function () {
    angular.module("CheckedIn")
        .controller("homeController", homeController);

    function homeController($location, $rootScope, userService){
        var model = this;

        // Event handles:
        model.logout = logout;
        model.searchVenueByName = searchVenueByName;
        model.searchVenueByLocation = searchVenueByLocation;

        var currentUser;
        function init() {
            userService.loggedin()
                .then(function (user) {
                    if(user == 0){
                        currentUser = null;
                    } else {
                        currentUser = user;
                        model.currentUser = currentUser;
                    }
                });
            $rootScope.title = "Home";
        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function searchVenueByName(location, name) {
            venueService.searchVenueByName(location, name)
                .then(function (response) {
                    model.resultByName = response.data;
                })
        }

        function searchVenueByLocation() {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var categoryId = "4bf58dd8d48988d17f941735";
                console.log(lat, lng);
                venueService.searchVenueByLocation(lat, lng, categoryId)
                    .then(function (response) {
                        model.resultByLocation = response.data;
                    });
            })
        }
    }
})();