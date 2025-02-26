import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../slice/UserSlice.ts";
import petImage from "../assets/logo.png";
import backgroundImg from "../assets/f4e2ec32-6a7c-4f0d-9458-4dacd806dec2.jpg";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {AppDispatch, RootState} from "../store/store.tsx";

const LogInPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state: RootState) => state.user);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill in both email and password.");
            return;
        }

        try {
            // @ts-ignore
            dispatch( loginUser({email, password})).unwrap();

            if (user) {
                toast.success("Logged in successfully.");
                navigate("/home"); // Redirecting after successful login
            } else {
                toast.error("Invalid email or password.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Login failed. Please try again.");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Email:", email + " Password:", password);
        handleLogin();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-300 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-10">
                <img src={backgroundImg} alt="Background" className="w-full h-full object-cover" />
            </div>

            {/* Main Container */}
            <div className="relative flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
                {/* Left Section - Only visible on medium screens and above */}
                <div className="hidden md:flex w-1/2 bg-blue-100 flex-col items-center justify-center p-6">
                    <h2 className="text-3xl font-semibold">Welcome back!</h2>
                    <img src={petImage} alt="Pet" className="max-h-96 w-72 rounded-lg" />
                    <p className="text-gray-600 mt-4 italic">Find your new best friend today!</p>
                </div>

                <div className="w-full md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
                    <div className="flex justify-center space-x-4 mb-6">
                        <button className="bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200 transition">
                            <FaFacebookF className="text-blue-600 text-xl"/>
                        </button>
                        <button className="bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200 transition">
                            <FcGoogle className="text-xl"/>
                        </button>
                        <button className="bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200 transition">
                            <FaInstagram className="text-pink-500 text-xl"/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <p className="text-sm text-blue-500 text-right cursor-pointer hover:underline">
                            Forgot your password?
                        </p>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            Sign In
                        </button>

                        <p className="text-center text-sm mt-4">
                            Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
