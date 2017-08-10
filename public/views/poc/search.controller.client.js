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