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
        model.toggleSearch = toggleSearch;

        var toggle = "name";

        function init() {
            model.toggle = toggle;
        }

        init();

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
                    model.resultByName = response.data;
                })
        }

        function searchVenueByLocation(category) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                venueService.searchVenueByLocation(lat, lng, category)
                    .then(function (response) {
                        model.resultByLocation = response.data;
                    });
            })
        }
    }
})();