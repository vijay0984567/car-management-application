import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, formData);
            if (response.status === 201) {
                toast.success("Signup successful! Please login.", { position: "top-center" });
                navigate("/login");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Signup failed. Please try again.",
                { position: "top-center" }
            );
        }
    };


    return (
        <section className="signin-area signin-one">
            {/* Toast notifications */}
            <ToastContainer />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <form
                            onSubmit={handleSubmit}
                            style={{ border: "1px solid black", borderRadius: "10px" }}
                        >
                            <h1 className="text-center py-3">Sign Up</h1>
                            <div className="signin-form form-style-two rounded-buttons">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-input">
                                            <label>Name</label>
                                            <div className="input-items default">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    placeholder="John Doe"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <i className="lni lni-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-input">
                                            <label>Email</label>
                                            <div className="input-items default">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="john.doe@gmail.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <i className="lni lni-envelope"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-input">
                                            <label>Password</label>
                                            <div className="input-items default">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="SecurePassword123"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <i className="lni lni-key"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-input rounded-buttons">
                                            <button
                                                className="btn btn-dark text-white dark-btn-outline rounded-full"
                                                type="submit"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-input text-center">
                                            <p className="text">
                                                Already have an account?{" "}
                                                <span
                                                    onClick={() => navigate("/login")}
                                                    className="text-decoration-underline"
                                                >
                                                    Login
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
