/**
 * Created by harsh on 8/1/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("detailController", detailController);

    function detailController($routeParams, venueService) {
        var model = this;

        var vid = $routeParams["vid"];

        function init() {
            venueService.searchVenueById(vid)
                .then(function (response) {
                    model.venue = response.data.response.venue;
                });
        }

        init();
    }
})();
