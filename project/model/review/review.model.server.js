/**
 * Created by harsh on 8/13/2017.
 */

var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var db = require("../models.server");

var reviewModel = mongoose.model("ReviewModel", reviewSchema);
reviewModel.createReview = createReview;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
reviewModel.findReviewsForVenue = findReviewsForVenue;
reviewModel.findReviewsForUser = findReviewsForUser;
module.exports = reviewModel;

function createReview(review) {
    return reviewModel.create(review);
}

function findReviewById(id) {
    return reviewModel.findById(id)
        .populate('_user')
        .exec();
}

reviewModel.find({_id: "59911e4e0b635c539dba5cce"}).then(function (response) {
    console.log(response);
});

reviewModel.find({venue: "57585d08498e05c399ce0c3d"}).then(function (response) {
    console.log(response);
});

function findReviewsForVenue(venueId) {
    console.log(venueId);
    reviewModel.find({_venue: venueId}).then(function (response) {
        console.log(response);
    });
    return reviewModel.find({_venue: venueId});
}

function findReviewsForUser(userId) {
    return reviewModel.find({_user: userId});
}

function updateReview(reviewId, newReview) {
    return reviewModel.update({_id: reviewId}, {$set: newReview});
}

function deleteReview(reviewId) {
    return reviewModel
        .findById(reviewId)
        .then(function (review) {
            return reviewModel.remove({_id: reviewId});
        });
}
