/**
 * Created by harsh on 7/31/2017.
 */
(function () {
    angular
        .module("CheckedIn")
        .controller("searchController", searchController);

    function searchController(userService, venueService, $rootScope, $location) {
        var model = this;

        model.searchVenueByName = searchVenueByName;
        model.searchVenueByLocation = searchVenueByLocation;


        var currentUser;

        function init() {

            if($location.search().type === "name"){
                searchVenueByName($location.search().location, $location.search().name);
            } else if($location.search().type === "location"){
                searchVenueByLocation($location.search().category);
            }
            userService.loggedin()
                .then(function (user) {
                    if(user == 0){
                        currentUser = null;
                    } else {
                        currentUser = user;
                        model.currentUser = currentUser;
                    }
                });

            $rootScope.title = "Search";

        }

        init();


        function searchVenueByName(location, name) {
            venueService.searchVenueByName(location, name)
                .then(function (response) {
                    $rootScope.result = response;
                })
        }

        function searchVenueByLocation(category) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                venueService.searchVenueByLocation(lat, lng, category)
                    .then(function (response) {
                        $rootScope.result = response;
                    });
            })
        }
    }
})();