import { Review } from "../models/Review.model.js";
import apiError from "../utils/ApiError.js";

const createReviewService = async ({ restaurantId, rating, comment, userId }) => {
  if (!restaurantId || !rating) {
    throw new apiError(400, "Restaurant ID and rating are required");
  }

  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  return Review.create({
    user: userId,
    restaurant: restaurantId,
    rating,
    comment,
  });
};

const updateReviewService = async (reviewId, userId, updates) => {
  if (!reviewId) {
    throw new apiError(400, "Review ID is required");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new apiError(404, "Review not found");
  }

  if (review.user.toString() !== userId.toString()) {
    throw new apiError(403, "You are not authorized to update this review");
  }

  const { rating, comment } = updates;
  if (rating) review.rating = rating;
  if (comment !== undefined) review.comment = comment;

  await review.save();
  return review;
};

const deleteReviewService = async (reviewId, userId) => {
  if (!reviewId) {
    throw new apiError(400, "Review ID is required");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new apiError(404, "Review not found");
  }

  if (review.user.toString() !== userId.toString()) {
    throw new apiError(403, "You are not authorized to delete this review");
  }

  await Review.findByIdAndDelete(reviewId);
  return null;
};

const getReviewsByRestaurantService = async (restaurantId) => {
  if (!restaurantId) {
    throw new apiError(400, "Restaurant ID is required");
  }

  return Review.find({ restaurant: restaurantId });
};

export {
  createReviewService,
  updateReviewService,
  deleteReviewService,
  getReviewsByRestaurantService,
};
