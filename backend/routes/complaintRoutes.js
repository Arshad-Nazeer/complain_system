const express = require("express");

const router = express.Router();

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const {
    addComplaint,
    getComplaints,
    updateComplaint,
    deleteComplaint,
    searchComplaintByLocation,
    filterComplaintByCategory
} = require(
    "../controllers/complaintController"
);


// ADD COMPLAINT
router.post(
    "/",
    authMiddleware,
    addComplaint
);


// GET ALL COMPLAINTS
router.get(
    "/",
    authMiddleware,
    getComplaints
);


// UPDATE STATUS
router.put(
    "/:id",
    authMiddleware,
    updateComplaint
);


// DELETE
router.delete(
    "/:id",
    authMiddleware,
    deleteComplaint
);


// SEARCH BY LOCATION
router.get(
    "/search/location",
    authMiddleware,
    searchComplaintByLocation
);


// FILTER BY CATEGORY
router.get(
    "/filter/category",
    authMiddleware,
    filterComplaintByCategory
);

module.exports = router;