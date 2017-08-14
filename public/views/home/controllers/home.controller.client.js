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

            $rootScope.toggle = toggle;

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
                $rootScope.toggle = toggle;
            } else {
                toggle = "name";
                $rootScope.toggle = toggle;
            }


        }

        function searchVenueByName(location, name) {
            $rootScope.location = location;
            $rootScope.name = name;
            venueService.searchVenueByName(location, name)
                .then(function (response) {
                    $rootScope.result = response;
                    $location.url("/search");
                })
        }

        function searchVenueByLocation(category) {
            $rootScope.category = category;
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