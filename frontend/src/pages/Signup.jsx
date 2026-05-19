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

            await API.post(
                "/auth/signup",
                formData
            );

            alert("Account Created");

            navigate("/");

        } catch (error) {

            alert(
                error.response.data.message
            );

        }

    };

    return (

        <div className="container">

            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Signup
                </button>

            </form>

            <p>
                Already have an account?
            </p>

            <Link to="/">
                Login
            </Link>

        </div>
    );
}

export default Signup;