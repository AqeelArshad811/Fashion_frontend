import React from "react";
import { handleSuccess } from "../../../utils/tostify";
import { handleError } from "../../../utils/tostify";
const baseURL = import.meta.env.VITE_SERVER_URI;

export const createReview = async (reviewData) => {
    console.log("reviewData in createReview in review services : ", reviewData);
    try {
        const response = await fetch(`${baseURL}/api/create-review`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            // body: reviewData,
            body: JSON.stringify({
                productId: reviewData.productId,
                rating: reviewData.rating,
                comment: reviewData.comment,
            }),
        });
        const data = await response.json();
        console.log("data from backend for creating review  in review services : ", data);
        if (data.success) {
            // handleSuccess("Review added successfully");
            return data;
        } else {
            handleError(data.message);

        }
    } catch (error) {
        console.log("error in creating review : ", error);
        handleError("Error adding review");
    }
}

export const getReviews = async (productId) => {
    try {
        const response = await fetch(`${baseURL}/api/get-review/${productId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json(); 
        console.log("data from backend for getting reviews in review services : ", data); 
        if (data.success) {
            return data;
        } else {
            handleError(data.message);
        }
    }
    catch (error) {
        console.log("error in getting reviews : ", error);
        handleError("Error getting reviews");
    }
}  

// for admin only , it can be access by admin only
export const deleteReview = async (reviewId) => {
    console.log("reviewId in deleteReview in review services : ", reviewId);
    try {
        const response = await fetch(`${baseURL}/api/delete-review/${reviewId}`, {
            method: "DELETE",
            credentials: "include",
        });
        const data = await response.json();
        console.log("data from backend for deleting review in review services : ", data);
        if (data.success) {
            handleSuccess("Review deleted successfully");
            return data;
        } else {
            handleError(data.message);
        }
    } catch (error) {
        console.log("error in deleting review : ", error);
        handleError("Error deleting review");
    }
}

// for admin only , it can be access by admin only
export const getReviewsByUser = async (userId) => {
    console.log("userId in getReviewsByUser in review services : ", userId);
    try {
        const response = await fetch(`${baseURL}/api/get-userReviews/${userId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        console.log("data from backend for getting reviews by user in review services : ", data);
        if (data.success) {
            return data;
        } else {
            handleError(data.message);
        }
    } catch (error) {
        console.log("error in getting reviews by user : ", error);
        handleError("Error getting reviews by user");
    }
}

export const getReviewByUserEmailOrUsername = async (emailOrUsername) => {
    console.log("emailOrUsername in getReviewByUserEmailOrUsername in review services : ", emailOrUsername);
    try {
        const response = await fetch(`${baseURL}/api/review-byNameEmail/${emailOrUsername}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        console.log("data from backend for getting review by user email or username in review services : ", data);
        if (data.success) {
            return data;
        } else {
            // handleError(data.message);
            return false
        }
    } catch (error) {
        console.log("error in getting review by user email or username : ", error);
        handleError("Error getting review by user email or username");
    }
}

export const getReviewByProductId = async (productId) => {
    console.log("productId in getReviewByProductId in review services : ", productId);
    try {
        const response = await fetch(`${baseURL}/api/review-byProductId/${productId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        console.log("data from backend for getting review by product id in review services : ", data);
        if (data.success) {
            return data;
        } else {
            // handleError(data.message);
            return false
        }
    } catch (error) {
        console.log("error in getting review by product id : ", error);
        handleError("Error getting review by product id");  
        return false
    }
}