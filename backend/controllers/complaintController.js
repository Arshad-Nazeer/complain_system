const Complaint = require("../models/Complaint");


// ADD COMPLAINT
exports.addComplaint = async (req, res) => {

    try {

        const complaint = await Complaint.create(
            req.body
        );

        res.status(201).json({
            message: "Complaint stored successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET ALL COMPLAINTS
exports.getComplaints = async (req, res) => {

    try {

        const complaints =
            await Complaint.find().sort({
                createdAt: -1
            });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE COMPLAINT STATUS
exports.updateComplaint = async (req, res) => {

    try {

        const complaint =
            await Complaint.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.status(200).json({
            message: "Status updated",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// DELETE COMPLAINT
exports.deleteComplaint = async (req, res) => {

    try {

        await Complaint.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Complaint removed"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// SEARCH BY LOCATION
exports.searchComplaintByLocation =
    async (req, res) => {

        try {

            const complaints =
                await Complaint.find({
                    location: {
                        $regex: req.query.location,
                        $options: "i"
                    }
                });

            res.status(200).json(complaints);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    };


// FILTER BY CATEGORY
exports.filterComplaintByCategory =
    async (req, res) => {

        try {

            const complaints =
                await Complaint.find({
                    category: req.query.category
                });

            res.status(200).json(complaints);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    };