/**
 * Created by harsh on 8/15/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("detailManagerController", detailManagerController);

    function detailManagerController($rootScope, $routeParams, venueService, notificationService, userService, reviewService, $location, $route, user) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.addReply = addReply;
        model.updateReply = updateReply;
        model.updateOffer = updateOffer;
        model.deleteOffer = deleteOffer;

        var vid = $routeParams["vid"];
        var currentUser;
        var venue;
        var venueExists = false;

        function init() {
            model.vid = vid;
            model.bookmarked = false;

            venueService.findVenueByVenueId(vid).then(function (response) {
                if(!response){
                    venueService.searchVenueById(vid)
                        .then(function (response) {
                            venue = response.response.venue;
                            venue.location = venue.location.formattedAddress;
                            model.venue = venue;
                            $rootScope.title = venue.name;
                        });
                }
                else {
                    venue = response;
                    model.venue = venue;
                    venueExists = true;
                    $rootScope.title = venue.name;
                }

                model.loggedin = true;
                model.uid = user._id;
                model.user = user;
            });

            reviewService.findReviewsForVenue(vid).then(function (response) {
                model.reviews = response.reverse();
            });


        }

        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function addReply(review) {
            venueService.findVenueByVenueId(vid).then(function (response) {
                if(!response){
                    var newVenue = {_id: vid,
                        name: venue.name,
                        location: venue.location.formattedAddress,
                        rating: venue.rating};
                    venueService.createVenue(newVenue);
                }
            });

            notification = {type: "REVIEW", _user: currentUser._id, _venue: vid};

            notificationService.createNotification(notification);

            review._user = currentUser._id;
            review._venue = vid;
            reviewService.createReview(review).then(function (response) {
                $route.reload();
            });
        }

        function updateReply(review) {
            reviewService.updateReview(review._id, review).then(function (response) {
                $route.reload();
            });
        }

        function updateOffer(newVenue) {
            venue.offerTitle = newVenue.offerTitle;
            venue.offerText = newVenue.offerText;
            venueService.updateVenue(vid, venue).then(function (response) {
                $route.reload();
            })
        }

        function deleteOffer() {
            venue.offerTitle = "";
            venue.offerText = "";
            venueService.updateVenue(vid, venue).then(function (response) {
                $route.reload();
            })

        }
    }
})();
