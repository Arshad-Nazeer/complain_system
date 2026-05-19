import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/signup", formData);

            alert("Account Created");
            navigate("/");

        } catch (error) {
            alert(
                error?.response?.data?.message || "Signup failed"
            );
        }

    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-logo">✨</div>
                <h1>Create Account</h1>
                <p className="auth-subtitle">Join us to submit and track complaints</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Create password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" style={{ marginTop: "6px" }}>
                        🚀 Create Account
                    </button>

                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to="/"> Login</Link>
                </div>

            </div>
        </div>
    );
}

export default Signup;