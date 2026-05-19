import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <div
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                background: "lightgray"
            }}
        >

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default Navbar;