// SignIn.jsx
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', email, password);
        // Add your logic here (e.g., API call for logging in)
    };

    return (
        <div className="signin-container"> {/* Wrap form in a container */}
            <h2 className="signin-title">Sign In</h2> {/* Added class for styling */}
            <form onSubmit={handleSubmit} className="signin-form"> {/* Added class for styling */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label> {/* Added label for accessibility */}
                    <input
                        type="email"
                        id="email" // Add ID for accessibility
                        className="input-field" // Use CSS class for consistent styling
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label> {/* Added label for accessibility */}
                    <input
                        type="password"
                        id="password" // Add ID for accessibility
                        className="input-field" // Use CSS class for consistent styling
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Log In</button> {/* Added class for styling */}
            </form>
            <div className="signup-prompt"> {/* Added sign-up prompt */}
                Don't have an account? <a href="/signup">Sign Up</a>
            </div>
        </div>
    );
};

export default SignIn;
