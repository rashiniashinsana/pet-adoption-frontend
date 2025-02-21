import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import petImage from "../assets/pngtree-cute-husky-dog-png-image_13462890.png";
import { FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (trimmedPassword !== trimmedConfirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log("Registered Successfully!", { email: trimmedEmail, password: trimmedPassword });

        setTimeout(() => {
            alert("Registration Successful! Redirecting to Sign In...");
            navigate("/");
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-300 relative overflow-hidden">
            <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Left Section - Sign Up Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-semibold text-center mb-4">Create Account</h2>
                    <div className="flex justify-center space-x-4 mb-6">
                        <button className="bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200 transition">
                            <FaFacebookF className="text-blue-600 text-xl" />
                        </button>
                        <button className="bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200 transition">
                            <FcGoogle className="text-xl"/>
                        </button>
                        <button className="bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200 transition">
                            <FaInstagram className="text-pink-500 text-xl"/>
                        </button>
                    </div>
                    <p className="text-center text-gray-600 mb-4">or use your e-mail for registration</p>
                    <form onSubmit={handleSubmit} className="space-y-4">

                         <input type="email" placeholder="Enter your E-mail" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="w-full p-3 border border-gray-300 rounded-lg" required/>
                        <input type="password" placeholder="Enter Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full p-3 border border-gray-300 rounded-lg" required/>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="w-full p-3 border border-gray-300 rounded-lg" required/>
                        <button type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        Already have an account? <Link to="/" className="text-blue-500">Sign In</Link>
                    </p>
                </div>

                {/* Right Section - Welcome Message */}
                <div className="hidden md:flex w-1/2 bg-blue-100 p-8 text-center flex-col justify-center items-center">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to Adopet!</h2>
                    <img src={petImage} alt="Pet" className="w-60 h-60 rounded-full mb-4"/>
                    <p className="text-gray-700 mb-6">To keep connected with us, please login with your personal
                        info</p>

                    <button
                        className="border border-blue-500 text-blue-500 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <Link to="/">Sign In</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
