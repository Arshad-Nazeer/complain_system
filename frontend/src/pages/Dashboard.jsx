import Navbar from "../components/Navbar";

import ComplaintForm from "./ComplaintForm";

import ComplaintList from "./ComplaintList";


function Dashboard() {

    return (

        <div>

            <Navbar />

            <h1>Dashboard</h1>

            <ComplaintForm />

            <ComplaintList />

        </div>
    );
}

export default Dashboard;