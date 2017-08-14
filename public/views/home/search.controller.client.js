/**
 * Created by harsh on 7/31/2017.
 */
(function () {
    angular
        .module("CheckedIn")
        .controller("searchController", searchController);

    function searchController(venueService) {
        var model = this;

        model.searchVenueByName = searchVenueByName;
        model.searchVenueByLocation = searchVenueByLocation;



        function init() {

        }

        init();


        function searchVenueByName(location, name) {
            venueService.searchVenueByName(location, name)
                .then(function (response) {
                    model.result = response;
                })
        }

        function searchVenueByLocation(category) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                venueService.searchVenueByLocation(lat, lng, category)
                    .then(function (response) {
                        model.result = response;
                    });
            })
        }
    }
})();