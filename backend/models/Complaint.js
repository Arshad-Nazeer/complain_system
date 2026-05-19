const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: [

            // GENERAL
            "Water Supply",
            "Electricity",
            "Garbage",
            "Road Damage",
            "Internet",

            // ACADEMIC INSTITUTIONS
            "Classroom Issue",
            "Laboratory Equipment",
            "Library Management",
            "Hostel Maintenance",
            "Campus WiFi",
            "Faculty Complaint",
            "Examination Issue",

            // MANUFACTURING FACILITIES
            "Machine Breakdown",
            "Production Delay",
            "Safety Hazard",
            "Raw Material Shortage",
            "Equipment Maintenance",
            "Factory Power Failure",

            // OFFICE BUILDINGS
            "HVAC Problem",
            "Office Network",
            "Printer Issue",
            "Security Access",
            "Elevator Fault",
            "Workspace Maintenance"

        ]
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    aiAnalysis: {

        priority: {
            type: String
        },

        department: {
            type: String
        },

        summary: {
            type: String
        },

        autoResponse: {
            type: String
        }

    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Complaint",
    complaintSchema
);