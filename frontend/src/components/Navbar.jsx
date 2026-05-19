import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <span className="brand-dot"></span>
                ComplaintSys
            </div>

            <div className="navbar-actions">
                <button
                    className="btn-danger"
                    onClick={logout}
                >
                    🚪 Logout
                </button>
            </div>

        </nav>
    );
}

export default Navbar;