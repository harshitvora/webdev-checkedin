/**
 * Created by harsh on 8/15/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .controller("registerManagerController", registerManagerController)

    function registerManagerController($routeParams, $location, userService, $rootScope, venueService) {
        var model = this;

        var vid = $routeParams["vid"];
        var venue;
        var username;

        //Event handles:
        model.register = register;

        function init() {
            venueService.findVenueByVenueId(vid).then(function (response) {
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
                }
                $rootScope.title = venue.name;
            });
        }
        init();

        function register(user) {
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    _user = response;
                    if(!_user){
                        if(user.password === user.verifyPassword){
                            var newUser = {username: user.username, password: user.password, role:  "MANAGER"};
                            return userService.createUser(newUser);
                        }
                        else {
                            model.error = "Passwords do not match!";
                        }
                    }
                    else{
                        model.error = "User already exists!";
                    }
                    return;
                })
                .then(function (response) {
                    var newUser = response;
                    venue._manager = newUser._id;
                    console.log(venue);
                    venueService.updateVenue(vid, venue).then(function (response) {
                        if(newUser){
                            login(newUser);
                        }
                        return;
                    });
                });
        }

        function login(user) {
            userService.login(user.username, user.password)
                .then(function (response) {
                    var _user = response;
                    if(!_user){
                        model.errorMessage = "Wrong username or password!";
                    }
                    else {
                        $rootScope.currentUser = _user;
                        $location.url("user/");
                    }
                });

        }
    }
})();
