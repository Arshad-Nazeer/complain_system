import Navbar from "../components/Navbar";
import ComplaintForm from "./ComplaintForm";
import ComplaintList from "./ComplaintList";

function Dashboard() {

    return (
        <div>

            <Navbar />

            <div className="dashboard">

                <div className="dashboard-header">
                    <h1>📋 Dashboard</h1>
                    <p>Manage, submit and track all complaints in one place.</p>
                </div>

                <div className="dashboard-grid">

                    <ComplaintForm />

                    <ComplaintList />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;