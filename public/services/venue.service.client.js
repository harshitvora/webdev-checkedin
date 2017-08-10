(function () {
    angular
        .module("CheckedIn")
        .service("venueService", venueService);


    function venueService($http) {
        this.searchVenueByName = searchVenueByName;
        this.searchVenueById = searchVenueById;
        this.searchVenueByLocation = searchVenueByLocation;

        CLIENT_ID = "O0RQ5MCQRO0CXOWBQSSE5JXLLCO1M0L51NOEJH23YTNNX05B";

        CLIENT_SECRET = "3UGFREITEOYUFAT0I2FK0YDL2SHDPS0IQEDMAN1F2FOGSD3I";

        GEO_API_KEY = "AIzaSyDGaL7od2kZJ1Aq5eBFgM0pjNKx5WqOy6I";

        var GEO_URL = "https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY";



        function searchVenueByName(location, name) {
            var url = "https://api.foursquare.com/v2/venues/search?near="+location+"&query="+name+"&intent=checkin&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20170801";
            return $http.get(url);
        }

        function searchVenueById(id) {
            var url = "https://api.foursquare.com/v2/venues/"+id+"?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20170801";
            return $http.get(url);
        }

        function searchVenueByLocation(lat, lng, categoryId) {
            var url = "https://api.foursquare.com/v2/venues/search?ll="+lat+","+lng+"&categoryId="+categoryId+"&intent=checkin&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20170801";;
            return $http.get(url);
        }

    }


})();