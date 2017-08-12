/**
 * Created by harsh on 8/1/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("detailController", detailController);

    function detailController($routeParams, venueService, userService) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.bookmarkVenue = bookmarkVenue;
        model.unbookmarkVenue = unbookmarkVenue;

        var vid = $routeParams["vid"];
        var currentUser;

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

            venueService.searchVenueById(vid)
                .then(function (response) {
                    model.venue = response.data.response.venue;
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
