/**
 * Created by harsh on 8/13/2017.
 */

(function () {
    angular
        .module("CheckedIn")
        .service("reviewService", reviewService);


    function reviewService($http) {
        this.findReviewByReviewId = findReviewByReviewId;
        this.createReview = createReview;
        this.updateReview = updateReview;
        this.deleteReview = deleteReview;
        this.findReviewsForVenue = findReviewsForVenue;
        this.findReviewsForUser = findReviewsForUser;

        function findReviewByReviewId(reviewId) {
            return $http.get("/api/review/"+reviewId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(review) {
            var url = "/api/review";
            return $http.post(url,review)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(reviewId, review) {
            var url = "/api/review/"+reviewId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/review/"+reviewId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsForUser(userId) {
            return $http.get("/api/review/user/"+userId)
                .then(function (response) {
                    return response.data;
                });

        }

        function findReviewsForVenue(venueId) {
            return $http.get("/api/review/venue/"+venueId)
                .then(function (response) {
                    return response.data;
                });

        }


    }
})();