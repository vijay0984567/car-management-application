import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert2 styles

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in both email and password.",
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, formData);
            if (response.status === 200) {
                // Store token in localStorage
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                await Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                });
                navigate("/");
                window.location.href = "/";

            }
        } catch (error) {
            console.error("Error during login:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || "Please check your credentials.",
            });
        }
    };

    return (
        <section className="signin-area signin-one">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <form
                            onSubmit={handleSubmit}
                            style={{ border: "1px solid black", borderRadius: "10px" }}
                        >
                            <h2 className="text-center py-3">Login</h2>
                            <div className="signin-form form-style-two rounded-buttons">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-input">
                                            <label>Email</label>
                                            <div className="input-items default">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="spyneai@gmail.com"
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
                                                    placeholder="Spyne@123"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <i className="lni lni-key"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-input rounded-buttons">
                                            <button
                                                className="btn btn-dark text-white dark-btn-outline rounded-full"
                                                type="submit"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-input text-center">
                                            <p className="text">
                                                New User? Click on{" "}
                                                <span
                                                    onClick={() => navigate("/signup")}
                                                    className="text-decoration-underline"
                                                >
                                                    Sign Up
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p><span className="text-danger">Note:</span>Test email: kadamdigvijay@gmail.com <br />Test password: password123</p>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <p className="text-center mt-5">Note: if you face login issue while refresh page once or twice else go to '/' path</p>
                </div>
            </div>
        </section>
    );
};

export default Login;
