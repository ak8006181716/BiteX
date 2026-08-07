import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/ApiResponse.js";
import {
    createReviewService,
    updateReviewService,
    deleteReviewService,
    getReviewsByRestaurantService,
} from "../services/review.service.js";

const createReview = asyncHandler(async (req, res, next) => {
    const review = await createReviewService({
        restaurantId: req.body.restaurantId,
        rating: req.body.rating,
        comment: req.body.comment,
        userId: req.user?._id,
    });

    return res.status(201).json(new apiResponse(200, review, "Review created successfully"));
});

const updateReview = asyncHandler(async (req, res, next) => {
    const review = await updateReviewService(req.params.id, req.user?._id, req.body);
    return res.status(200).json(new apiResponse(200, review, "Review updated successfully"));
});

const deleteReview = asyncHandler(async (req, res, next) => {
    await deleteReviewService(req.params.id, req.user?._id);
    return res.status(200).json(new apiResponse(200, null, "Review deleted successfully"));
});

const getReviewsByRestaurant = asyncHandler(async (req, res, next) => {
    const reviews = await getReviewsByRestaurantService(req.params.id);
    return res.status(200).json(new apiResponse(200, reviews, "Reviews retrieved successfully"));
});

export {
    createReview,
    updateReview,
    deleteReview,
    getReviewsByRestaurant,
};