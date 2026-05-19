const express = require("express");

const router = express.Router();

const {
    analyzeComplaint
} = require(
    "../controllers/aiController"
);


// ANALYZE ALL COMPLAINTS
router.get(
    "/analyze",
    analyzeComplaint
);

module.exports = router;