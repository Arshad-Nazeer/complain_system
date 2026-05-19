// ============================================================
// OLD VERSION (commented out — preserved for reference)
// ============================================================
// import { useState } from "react";
// import API from "../api";
// function ComplaintForm({ fetchComplaints }) { ... }
// export default ComplaintForm;
// ============================================================

import { useState } from "react";
import API from "../api";

const CATEGORIES = [
    {
        label: "General Services",
        options: ["Water Supply", "Electricity", "Garbage", "Road Damage", "Internet"]
    },
    {
        label: "Academic Institutions",
        options: ["Classroom Issue", "Laboratory Equipment", "Library Management", "Hostel Maintenance", "Campus WiFi", "Faculty Complaint", "Examination Issue"]
    },
    {
        label: "Manufacturing Facilities",
        options: ["Machine Breakdown", "Production Delay", "Safety Hazard", "Raw Material Shortage", "Equipment Maintenance", "Factory Power Failure"]
    },
    {
        label: "Office Buildings",
        options: ["HVAC Problem", "Office Network", "Printer Issue", "Security Access", "Elevator Fault", "Workspace Maintenance"]
    }
];

function ComplaintForm({ fetchComplaints }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: ""
    });

    // AI RESULT
    const [aiResult, setAiResult] = useState(null);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ANALYZE AI
    const analyzeAI = async () => {

        try {

            const res = await API.get("/ai/analyze");

            setAiResult(res.data);

            alert("AI Analysis Complete");

        } catch (error) {

            alert(
                error?.response?.data?.message || "AI Error"
            );

        }

    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const complaintData = {
                ...formData,
                aiAnalysis: aiResult
            };

            await API.post("/complaints", complaintData);

            alert("Complaint Submitted");

            setFormData({
                name: "",
                email: "",
                title: "",
                description: "",
                category: "",
                location: ""
            });

            setAiResult(null);

            if (fetchComplaints) {
                fetchComplaints();
            }

        } catch (error) {

            alert(
                error?.response?.data?.message || "Submission Failed"
            );

        }

    };

    return (
        <div className="form-card">

            <h2>📝 Add Complaint</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Complaint title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                {/* CATEGORY */}
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                            {group.options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <div className="form-btn-group">
                    <button
                        type="button"
                        className="btn-ai"
                        onClick={analyzeAI}
                    >
                        🤖 Analyze AI
                    </button>

                    <button type="submit">
                        🚀 Submit
                    </button>
                </div>

            </form>

            {/* AI RESULTS */}
            {aiResult && (
                <div className="ai-result-box">
                    <h3>🤖 AI Analysis Result</h3>
                    <div className="ai-row">
                        <div className="ai-item">
                            <b>Complaint:</b>
                            <span>{aiResult.title}</span>
                        </div>
                        <div className="ai-item">
                            <b>Priority:</b>
                            <span>{aiResult.priority}</span>
                        </div>
                        <div className="ai-item">
                            <b>Department:</b>
                            <span>{aiResult.department}</span>
                        </div>
                        <div className="ai-item">
                            <b>Summary:</b>
                            <span>{aiResult.summary}</span>
                        </div>
                        <div className="ai-item">
                            <b>Auto Response:</b>
                            <span>{aiResult.autoResponse}</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ComplaintForm;