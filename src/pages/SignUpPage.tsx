import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../slice/UserSlice";
import petImage from "../assets/pngtree-cute-husky-dog-png-image_13462890.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {RootState} from "../store/store.tsx";

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword || !role) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        dispatch(addUser({ email, password, role }));
        alert("Registration Successful! Redirecting to Sign In...");
        navigate("/");
    };

    const registrationError = useSelector((state: RootState) => state.user.registrationError);


    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-300 relative overflow-hidden">
            <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="email" placeholder="Enter your E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
                        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
                        <input type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required>
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                        </select>
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
                    </form>
                    {registrationError && <div style={{ color: "red" }}>{registrationError}</div>}

                    <p className="text-center text-sm mt-4">
                        Already have an account? <a href="/" className="text-blue-500">Sign In</a>
                    </p>
                </div>
                <div className="hidden md:flex w-1/2 bg-blue-100 p-8 text-center flex-col justify-center items-center">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to Adopet!</h2>
                    <img src={petImage} alt="Pet" className="w-60 h-60 rounded-full mb-4" />
                    <p className="text-gray-700 mb-6">To keep connected with us, please login with your personal info</p>
                    <a href="/" className="border border-blue-500 text-blue-500 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
