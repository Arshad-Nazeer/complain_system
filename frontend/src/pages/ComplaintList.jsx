// import { useEffect, useState } from "react";

// import API from "../api";


// function ComplaintList() {

//     const [complaints, setComplaints] =
//         useState([]);

//     const [category, setCategory] =
//         useState("");

//     const [location, setLocation] =
//         useState("");


//     // FETCH ALL COMPLAINTS
//     const fetchComplaints = async () => {

//         try {

//             const res = await API.get(
//                 "/complaints"
//             );

//             setComplaints(res.data);

//         } catch (error) {

//             console.log(error);

//         }

//     };


//     useEffect(() => {

//         fetchComplaints();

//     }, []);


//     // FILTER BY CATEGORY
//     const filterByCategory = async () => {

//         try {

//             if (!category) {
//                 return fetchComplaints();
//             }

//             const res = await API.get(
//                 `/complaints/filter/category?category=${category}`
//             );

//             setComplaints(res.data);

//         } catch (error) {

//             console.log(error);

//         }

//     };


//     // SEARCH BY LOCATION
//     const searchByLocation = async () => {

//         try {

//             if (!location) {
//                 return fetchComplaints();
//             }

//             const res = await API.get(
//                 `/complaints/search/location?location=${location}`
//             );

//             setComplaints(res.data);

//         } catch (error) {

//             console.log(error);

//         }

//     };


//     // UPDATE STATUS
//     const updateStatus = async (
//         id,
//         status
//     ) => {

//         try {

//             await API.put(
//                 `/complaints/${id}`,
//                 { status }
//             );

//             fetchComplaints();

//         } catch (error) {

//             console.log(error);

//         }

//     };


//     // DELETE COMPLAINT
//     const deleteComplaint = async (id) => {

//         try {

//             await API.delete(
//                 `/complaints/${id}`
//             );

//             fetchComplaints();

//         } catch (error) {

//             console.log(error);

//         }

//     };


//     return (

//         <div>

//             <h2>All Complaints</h2>


//             {/* FILTER + SEARCH */}

//             <div
//                 style={{
//                     display: "flex",
//                     gap: "10px",
//                     marginBottom: "20px",
//                     flexWrap: "wrap"
//                 }}
//             >


//                 {/* CATEGORY FILTER */}

//                 <select
//                     value={category}
//                     onChange={(e) =>
//                         setCategory(e.target.value)
//                     }
//                 >

//                     <option value="">
//                         Select Category
//                     </option>


//                     {/* GENERAL */}

//                     <optgroup label="General Services">

//                         <option value="Water Supply">
//                             Water Supply
//                         </option>

//                         <option value="Electricity">
//                             Electricity
//                         </option>

//                         <option value="Garbage">
//                             Garbage
//                         </option>

//                         <option value="Road Damage">
//                             Road Damage
//                         </option>

//                         <option value="Internet">
//                             Internet
//                         </option>

//                     </optgroup>


//                     {/* ACADEMIC */}

//                     <optgroup label="Academic Institutions">

//                         <option value="Classroom Issue">
//                             Classroom Issue
//                         </option>

//                         <option value="Laboratory Equipment">
//                             Laboratory Equipment
//                         </option>

//                         <option value="Library Management">
//                             Library Management
//                         </option>

//                         <option value="Hostel Maintenance">
//                             Hostel Maintenance
//                         </option>

//                         <option value="Campus WiFi">
//                             Campus WiFi
//                         </option>

//                         <option value="Faculty Complaint">
//                             Faculty Complaint
//                         </option>

//                         <option value="Examination Issue">
//                             Examination Issue
//                         </option>

//                     </optgroup>


//                     {/* MANUFACTURING */}

//                     <optgroup label="Manufacturing Facilities">

//                         <option value="Machine Breakdown">
//                             Machine Breakdown
//                         </option>

//                         <option value="Production Delay">
//                             Production Delay
//                         </option>

//                         <option value="Safety Hazard">
//                             Safety Hazard
//                         </option>

//                         <option value="Raw Material Shortage">
//                             Raw Material Shortage
//                         </option>

//                         <option value="Equipment Maintenance">
//                             Equipment Maintenance
//                         </option>

//                         <option value="Factory Power Failure">
//                             Factory Power Failure
//                         </option>

//                     </optgroup>


//                     {/* OFFICE */}

//                     <optgroup label="Office Buildings">

//                         <option value="HVAC Problem">
//                             HVAC Problem
//                         </option>

//                         <option value="Office Network">
//                             Office Network
//                         </option>

//                         <option value="Printer Issue">
//                             Printer Issue
//                         </option>

//                         <option value="Security Access">
//                             Security Access
//                         </option>

//                         <option value="Elevator Fault">
//                             Elevator Fault
//                         </option>

//                         <option value="Workspace Maintenance">
//                             Workspace Maintenance
//                         </option>

//                     </optgroup>

//                 </select>


//                 <button onClick={filterByCategory}>
//                     Filter
//                 </button>


//                 {/* LOCATION SEARCH */}

//                 <input
//                     type="text"
//                     placeholder="Search by Location"
//                     value={location}
//                     onChange={(e) =>
//                         setLocation(e.target.value)
//                     }
//                 />


//                 <button onClick={searchByLocation}>
//                     Search
//                 </button>


//                 <button onClick={fetchComplaints}>
//                     Reset
//                 </button>

//             </div>


//             {/* COMPLAINT LIST */}

//             {
//                 complaints.length === 0 ? (

//                     <p>No complaints found</p>

//                 ) : (

//                     complaints.map((item) => (

//                         <div
//                             key={item._id}
//                             style={{
//                                 border: "1px solid gray",
//                                 padding: "20px",
//                                 marginBottom: "20px",
//                                 background: "white"
//                             }}
//                         >

//                             <h3>{item.title}</h3>

//                             <p>
//                                 <b>Name:</b> {item.name}
//                             </p>

//                             <p>
//                                 <b>Email:</b> {item.email}
//                             </p>

//                             <p>
//                                 <b>Description:</b>
//                                 {" "}
//                                 {item.description}
//                             </p>

//                             <p>
//                                 <b>Category:</b>
//                                 {" "}
//                                 {item.category}
//                             </p>

//                             <p>
//                                 <b>Location:</b>
//                                 {" "}
//                                 {item.location}
//                             </p>

//                             <p>
//                                 <b>Status:</b>
//                                 {" "}
//                                 {item.status}
//                             </p>

//                             <p>
//                                 <b>Created:</b>
//                                 {" "}
//                                 {
//                                     new Date(
//                                         item.createdAt
//                                     ).toLocaleString()
//                                 }
//                             </p>


//                             {/* STATUS UPDATE */}

//                             <div
//                                 style={{
//                                     display: "flex",
//                                     gap: "10px",
//                                     marginTop: "10px"
//                                 }}
//                             >

//                                 <select
//                                     value={item.status}
//                                     onChange={(e) =>
//                                         updateStatus(
//                                             item._id,
//                                             e.target.value
//                                         )
//                                     }
//                                 >

//                                     <option value="Pending">
//                                         Pending
//                                     </option>

//                                     <option value="In Progress">
//                                         In Progress
//                                     </option>

//                                     <option value="Resolved">
//                                         Resolved
//                                     </option>

//                                 </select>


//                                 {/* DELETE */}

//                                 <button
//                                     onClick={() =>
//                                         deleteComplaint(item._id)
//                                     }
//                                 >
//                                     Delete
//                                 </button>

//                             </div>

//                         </div>

//                     ))
//                 )
//             }

//         </div>
//     );
// }

// export default ComplaintList;
import { useEffect, useState } from "react";

import API from "../api";


function ComplaintList() {

    const [complaints, setComplaints] =
        useState([]);

    const [category, setCategory] =
        useState("");

    const [location, setLocation] =
        useState("");


    // FETCH ALL COMPLAINTS
    const fetchComplaints = async () => {

        try {

            const res = await API.get(
                "/complaints"
            );

            setComplaints(res.data);

        }

        catch (error) {

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

        }

        catch (error) {

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

        }

        catch (error) {

            console.log(error);

        }

    };


    // UPDATE STATUS
    const updateStatus = async (
        id,
        status
    ) => {

        try {

            await API.put(
                `/complaints/${id}`,
                { status }
            );

            fetchComplaints();

        }

        catch (error) {

            console.log(error);

        }

    };


    // DELETE COMPLAINT
    const deleteComplaint = async (id) => {

        try {

            await API.delete(
                `/complaints/${id}`
            );

            fetchComplaints();

        }

        catch (error) {

            console.log(error);

        }

    };


    return (

        <div>

            <h2>All Complaints</h2>


            {/* FILTERS */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >


                {/* CATEGORY FILTER */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    <option value="">
                        Select Category
                    </option>


                    {/* GENERAL */}

                    <optgroup label="General Services">

                        <option value="Water Supply">
                            Water Supply
                        </option>

                        <option value="Electricity">
                            Electricity
                        </option>

                        <option value="Garbage">
                            Garbage
                        </option>

                        <option value="Road Damage">
                            Road Damage
                        </option>

                        <option value="Internet">
                            Internet
                        </option>

                    </optgroup>


                    {/* ACADEMIC */}

                    <optgroup label="Academic Institutions">

                        <option value="Classroom Issue">
                            Classroom Issue
                        </option>

                        <option value="Laboratory Equipment">
                            Laboratory Equipment
                        </option>

                        <option value="Library Management">
                            Library Management
                        </option>

                        <option value="Hostel Maintenance">
                            Hostel Maintenance
                        </option>

                        <option value="Campus WiFi">
                            Campus WiFi
                        </option>

                        <option value="Faculty Complaint">
                            Faculty Complaint
                        </option>

                        <option value="Examination Issue">
                            Examination Issue
                        </option>

                    </optgroup>


                    {/* MANUFACTURING */}

                    <optgroup label="Manufacturing Facilities">

                        <option value="Machine Breakdown">
                            Machine Breakdown
                        </option>

                        <option value="Production Delay">
                            Production Delay
                        </option>

                        <option value="Safety Hazard">
                            Safety Hazard
                        </option>

                        <option value="Raw Material Shortage">
                            Raw Material Shortage
                        </option>

                        <option value="Equipment Maintenance">
                            Equipment Maintenance
                        </option>

                        <option value="Factory Power Failure">
                            Factory Power Failure
                        </option>

                    </optgroup>


                    {/* OFFICE */}

                    <optgroup label="Office Buildings">

                        <option value="HVAC Problem">
                            HVAC Problem
                        </option>

                        <option value="Office Network">
                            Office Network
                        </option>

                        <option value="Printer Issue">
                            Printer Issue
                        </option>

                        <option value="Security Access">
                            Security Access
                        </option>

                        <option value="Elevator Fault">
                            Elevator Fault
                        </option>

                        <option value="Workspace Maintenance">
                            Workspace Maintenance
                        </option>

                    </optgroup>

                </select>


                <button onClick={filterByCategory}>
                    Filter
                </button>


                {/* SEARCH LOCATION */}

                <input
                    type="text"
                    placeholder="Search by Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />


                <button onClick={searchByLocation}>
                    Search
                </button>


                <button onClick={fetchComplaints}>
                    Reset
                </button>

            </div>


            {/* COMPLAINTS */}

            {
                complaints.length === 0 ? (

                    <p>No complaints found</p>

                ) : (

                    complaints.map((item) => (

                        <div
                            key={item._id}
                            style={{
                                border: "1px solid gray",
                                padding: "20px",
                                marginBottom: "20px",
                                background: "white"
                            }}
                        >

                            <h3>{item.title}</h3>

                            <p>
                                <b>Name:</b>
                                {" "}
                                {item.name}
                            </p>

                            <p>
                                <b>Email:</b>
                                {" "}
                                {item.email}
                            </p>

                            <p>
                                <b>Description:</b>
                                {" "}
                                {item.description}
                            </p>

                            <p>
                                <b>Category:</b>
                                {" "}
                                {item.category}
                            </p>

                            <p>
                                <b>Location:</b>
                                {" "}
                                {item.location}
                            </p>

                            <p>
                                <b>Status:</b>
                                {" "}
                                {item.status}
                            </p>

                            <p>
                                <b>Created:</b>
                                {" "}
                                {
                                    new Date(
                                        item.createdAt
                                    ).toLocaleString()
                                }
                            </p>


                            {/* AI ANALYSIS */}

                            {
                                item.aiAnalysis && (

                                    <div
                                        style={{
                                            background: "#eef",
                                            padding: "15px",
                                            marginTop: "15px",
                                            borderRadius: "5px"
                                        }}
                                    >

                                        <h4>
                                            AI Analysis
                                        </h4>

                                        <p>
                                            <b>Priority:</b>
                                            {" "}
                                            {
                                                item.aiAnalysis
                                                    .priority
                                            }
                                        </p>

                                        <p>
                                            <b>Department:</b>
                                            {" "}
                                            {
                                                item.aiAnalysis
                                                    .department
                                            }
                                        </p>

                                        <p>
                                            <b>Summary:</b>
                                            {" "}
                                            {
                                                item.aiAnalysis
                                                    .summary
                                            }
                                        </p>

                                        <p>
                                            <b>Auto Response:</b>
                                            {" "}
                                            {
                                                item.aiAnalysis
                                                    .autoResponse
                                            }
                                        </p>

                                    </div>

                                )
                            }


                            {/* STATUS + DELETE */}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "15px"
                                }}
                            >

                                {/* UPDATE STATUS */}

                                <select
                                    value={item.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            item._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Resolved">
                                        Resolved
                                    </option>

                                </select>


                                {/* DELETE */}

                                <button
                                    onClick={() =>
                                        deleteComplaint(
                                            item._id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))
                )
            }

        </div>
    );
}

export default ComplaintList;