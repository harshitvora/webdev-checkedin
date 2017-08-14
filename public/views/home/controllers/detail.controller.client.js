/**
 * Created by harsh on 8/1/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("detailController", detailController);

    function detailController($routeParams, venueService, userService, reviewService) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.bookmarkVenue = bookmarkVenue;
        model.unbookmarkVenue = unbookmarkVenue;

        var vid = $routeParams["vid"];
        var currentUser;
        var venue;

        function init() {

            model.bookmarked = false;
            userService.loggedin()
                .then(function (user) {
                    if(user == 0){
                        currentUser = null;
                    } else {
                        currentUser = user;
                        if(currentUser.bookmarks.includes(vid)){
                            model.bookmarked = true;
                        }
                    }
                });

            venueService.findVenueByVenueId(vid).then(function (response) {
                console.log(response);
                if(!response){
                    venueService.searchVenueById(vid)
                        .then(function (response) {
                            venue = response.response.venue;
                            venue.location = venue.location.formattedAddress;
                            model.venue = venue;
                        });
                }
                else {
                    venue = response;
                    model.venue = venue;
                    console.log(venue);
                }
            });

            reviewService.findReviewsForVenue(vid).then(function (response) {
                console.log(response);
                model.reviews = response;
            });


        }

        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function bookmarkVenue() {
            if(!currentUser){
                alert("Login to perform this action!");
            } else {

                venueService.findVenueByVenueId(vid).then(function (response) {
                    if(!response){
                        var newVenue = {_id: vid,
                            name: venue.name,
                            location: venue.location.formattedAddress,
                        rating: venue.rating};
                        venueService.createVenue(newVenue);
                    }
                });

                venueService.bookmarkVenue(currentUser._id, vid)
                    .then(function (response) {
                        model.bookmarked = true;
                    });
            }
        }

        function unbookmarkVenue() {
            venueService.unbookmarkVenue(currentUser._id, vid)
                .then(function (response) {
                    model.bookmarked = false;
                });

        }
    }
})();
