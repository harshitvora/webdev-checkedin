(function () {
    angular.module("CheckedIn")
        .controller("homeController", homeController);

    function homeController($location, $rootScope, userService, venueService){
        var model = this;

        // Event handles:
        model.logout = logout;
        model.toggleSearch = toggleSearch;
        model.searchVenueByLocation = searchVenueByLocation;
        model.searchVenueByName = searchVenueByName;

        var currentUser;
        var toggle = "name";
        function init() {

            model.toggle = toggle;

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

        function toggleSearch() {
            if(toggle == "name"){
                toggle = "location";
                model.toggle = toggle;
            } else {
                toggle = "name";
                model.toggle = toggle;
            }


        }

        function searchVenueByName(location, name) {
            venueService.searchVenueByName(location, name)
                .then(function (response) {
                    $rootScope.location = location;
                    $rootScope.name = name;
                    $rootScope.result = response;
                    $location.url("/search");
                })
        }

        function searchVenueByLocation(category) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                venueService.searchVenueByLocation(lat, lng, category)
                    .then(function (response) {
                        $rootScope.result = response;
                        $location.url("/search");
                    });
            })
        }


    }
})();