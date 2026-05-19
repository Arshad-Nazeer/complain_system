import { useEffect, useState } from "react";
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

function getStatusClass(status) {
    if (status === "Pending") return "pending";
    if (status === "In Progress") return "progress";
    if (status === "Resolved") return "resolved";
    return "";
}

function ComplaintList() {

    const [complaints, setComplaints] = useState([]);
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");


    // FETCH ALL COMPLAINTS
    const fetchComplaints = async () => {

        try {

            const res = await API.get("/complaints");
            setComplaints(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        fetchComplaints();
    }, []);


    // FILTER BY CATEGORY
    const filterByCategory = async () => {

        try {

            if (!category) {
                return fetchComplaints();
            }

            const res = await API.get(
                `/complaints/filter/category?category=${category}`
            );

            setComplaints(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // SEARCH BY LOCATION
    const searchByLocation = async () => {

        try {

            if (!location) {
                return fetchComplaints();
            }

            const res = await API.get(
                `/complaints/search/location?location=${location}`
            );

            setComplaints(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // UPDATE STATUS
    const updateStatus = async (id, status) => {

        try {

            await API.put(`/complaints/${id}`, { status });
            fetchComplaints();

        } catch (error) {

            console.log(error);

        }

    };


    // DELETE COMPLAINT
    const deleteComplaint = async (id) => {

        try {

            await API.delete(`/complaints/${id}`);
            fetchComplaints();

        } catch (error) {

            console.log(error);

        }

    };


    return (
        <div className="list-section">

            {/* HEADER */}
            <div className="list-header">
                <h2>
                    📂 All Complaints
                    <span className="complaint-count">
                        {complaints.length}
                    </span>
                </h2>
            </div>


            {/* FILTER BAR */}
            <div className="filter-bar">

                {/* CATEGORY FILTER */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                            {group.options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>

                <button onClick={filterByCategory}>
                    🔍 Filter
                </button>

                {/* LOCATION SEARCH */}
                <input
                    type="text"
                    placeholder="Search by location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <button onClick={searchByLocation}>
                    📍 Search
                </button>

                <button className="btn-ghost" onClick={fetchComplaints}>
                    ↺ Reset
                </button>

            </div>


            {/* COMPLAINTS GRID */}
            <div className="complaints-grid">

                {complaints.length === 0 ? (

                    <div className="no-complaints">
                        <span className="no-icon">📭</span>
                        <p>No complaints found</p>
                    </div>

                ) : (

                    complaints.map((item, index) => (

                        <div
                            key={item._id}
                            className="complaint-card"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >

                            {/* CARD HEADER */}
                            <div className="complaint-card-header">
                                <h3>{item.title}</h3>
                                <span className={`status-badge ${getStatusClass(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>

                            {/* META INFO */}
                            <div className="complaint-meta">
                                <div className="complaint-meta-item">
                                    <b>👤 Name: </b>{item.name}
                                </div>
                                <div className="complaint-meta-item">
                                    <b>📧 Email: </b>{item.email}
                                </div>
                                <div className="complaint-meta-item">
                                    <b>🏷️ Category: </b>{item.category}
                                </div>
                                <div className="complaint-meta-item">
                                    <b>📍 Location: </b>{item.location}
                                </div>
                                <div className="complaint-meta-item" style={{ gridColumn: "1 / -1" }}>
                                    <b>📝 Description: </b>{item.description}
                                </div>
                                <div className="complaint-meta-item">
                                    <b>🕒 Created: </b>
                                    {new Date(item.createdAt).toLocaleString()}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="complaint-actions">

                                <select
                                    value={item.status}
                                    onChange={(e) =>
                                        updateStatus(item._id, e.target.value)
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>

                                <button
                                    className="btn-danger"
                                    onClick={() => deleteComplaint(item._id)}
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default ComplaintList;