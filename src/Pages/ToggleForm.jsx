import React, { useState } from "react";
import ToggleSwitch from "../Components/ToggleSwitch/ToggleSwitch.jsx"; // Import your ToggleSwitch
import Modal from "../Components/Modal/Modal.jsx";  // Import the Modal component
import './ToggleForm.css';

const ToggleForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);  // Modal opens automatically
    const [isSignUp, setIsSignUp] = useState(false);  // Initially show login form

    // Close the modal when users click "X" or outside the modal content
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Toggle between login and sign-up forms
    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>{isSignUp ? "Sign up" : "Sign in"}</h2>
                <ToggleSwitch
                    label={isSignUp ? "Already have an account? Log In" : "New here? Sign Up"}
                />
                <input
                    type="checkbox"
                    checked={isSignUp}
                    onChange={handleToggle}
                />

                {isSignUp ? (
                    <form>
                        <input type="text" placeholder="Name" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Sign Up</button>
                    </form>
                ) : (
                    <form>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Log In</button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default ToggleForm;
