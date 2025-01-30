import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        // Get user data (assuming it's stored in localStorage)
        const storedUser = JSON.parse(localStorage.getItem('user')); // Adjust as per your setup
        console.log("storedUser", storedUser);
        if (storedUser) {
            setLoggedIn(true);
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        // Clear the token and user data from localStorage
        localStorage.removeItem('authtoken');
        localStorage.removeItem('user');
        setUser(null); // Reset the user state
        navigate('/login'); // Redirect to login page
        setLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-gray">
            <div className="container-fluid my-2">
                <a className="navbar-brand fs-4" href="/"><i class="bi bi-car-front-fill "></i> Car Manage</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* You can add other menu items here */}
                    </ul>

                    <div className="d-flex gap-1">
                        {/* If user is logged in, show username and logout button */}
                        {!loggedIn ? (
                            <>

                                <button onClick={() => navigate('/login')} className="btn btn-outline-dark" type="button">Login</button>
                                <button onClick={() => navigate('/signup')} className="btn btn-dark" type="button">SignUp</button>
                            </>
                        ) : (
                            <>
                                <span className="navbar-text me-2 fw-bold"><i class="bi bi-person-circle"></i> {user?.username}</span> {/* Display the user's name */}
                                <button onClick={handleLogout} className="btn btn-outline-danger" type="button">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;