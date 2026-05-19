// import { useState } from "react";

// import API from "../api";


// function ComplaintForm({ fetchComplaints }) {

//     const [formData, setFormData] = useState({

//         name: "",
//         email: "",
//         title: "",
//         description: "",
//         category: "",
//         location: ""

//     });

//     const [aiResult, setAiResult] =
//         useState("");


//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });

//     };


//     // AI ANALYSIS
//     const analyzeAI = async () => {

//         try {

//             const res = await API.post(
//                 "/ai/analyze",
//                 formData
//             );

//             setAiResult(res.data.result);

//         } catch (error) {

//             alert("AI Error");

//         }

//     };


//     // SUBMIT
//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             await API.post(
//                 "/complaints",
//                 formData
//             );

//             alert("Complaint Submitted");

//             setFormData({
//                 name: "",
//                 email: "",
//                 title: "",
//                 description: "",
//                 category: "",
//                 location: ""
//             });

//             if (fetchComplaints) {
//                 fetchComplaints();
//             }

//         } catch (error) {

//             alert(
//                 error.response.data.message
//             );

//         }

//     };


//     return (

//         <div>

//             <h2>Add Complaint</h2>

//             <form onSubmit={handleSubmit}>

//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Complaint Title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                 />

//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                 />


//                 {/* CATEGORY DROPDOWN */}

//                 <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
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


//                 <input
//                     type="text"
//                     name="location"
//                     placeholder="Location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                 />


//                 <button
//                     type="button"
//                     onClick={analyzeAI}
//                 >
//                     Analyze AI
//                 </button>


//                 <button type="submit">
//                     Submit Complaint
//                 </button>

//             </form>


//             <h3>AI Analysis Result</h3>

//             <pre>{aiResult}</pre>

//         </div>
//     );
// }

// export default ComplaintForm;

import { useState } from "react";

import API from "../api";


function ComplaintForm({
    fetchComplaints
}) {

    const [formData, setFormData] =
        useState({

            name: "",
            email: "",
            title: "",
            description: "",
            category: "",
            location: ""

        });


    // AI RESULT
    const [aiResult, setAiResult] =
        useState(null);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };


    // ANALYZE AI
    const analyzeAI = async () => {

        try {

            const res = await API.get(
                "/ai/analyze"
            );

            setAiResult(res.data);

            alert(
                "AI Analysis Complete"
            );

        }

        catch (error) {

            alert(
                error?.response?.data?.message ||
                "AI Error"
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


            await API.post(
                "/complaints",
                complaintData
            );


            alert(
                "Complaint Submitted"
            );


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

        }

        catch (error) {

            alert(
                error?.response?.data?.message ||
                "Submission Failed"
            );

        }

    };


    return (

        <div>

            <h2>Add Complaint</h2>

            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="title"
                    placeholder="Complaint Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />


                <textarea
                    name="description"
                    placeholder="Description"
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


                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />


                {/* AI BUTTON */}

                <button
                    type="button"
                    onClick={analyzeAI}
                >
                    Analyze AI
                </button>


                <button type="submit">
                    Submit Complaint
                </button>

            </form>


            {/* AI RESULTS */}

            {
                aiResult && (

                    <div
                        style={{
                            background: "#f5f5f5",
                            padding: "20px",
                            marginTop: "20px",
                            border: "1px solid gray"
                        }}
                    >

                        <h3>
                            Most Urgent Complaint
                        </h3>

                        <p>
                            <b>Complaint:</b>
                            {" "}
                            {aiResult.title}
                        </p>

                        <p>
                            <b>Priority:</b>
                            {" "}
                            {aiResult.priority}
                        </p>

                        <p>
                            <b>Department:</b>
                            {" "}
                            {aiResult.department}
                        </p>

                        <p>
                            <b>Summary:</b>
                            {" "}
                            {aiResult.summary}
                        </p>

                        <p>
                            <b>Auto Response:</b>
                            {" "}
                            {aiResult.autoResponse}
                        </p>

                    </div>

                )
            }

        </div>
    );
}

export default ComplaintForm;