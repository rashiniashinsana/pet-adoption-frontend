import { useState } from "react";
import {
    LiaBarsSolid,
    LiaEnvelopeOpenSolid,
    LiaHomeSolid,
    LiaPawSolid,
    LiaSignOutAltSolid,
    LiaUserFriendsSolid
} from "react-icons/lia";
import { Link } from "react-router-dom"; // Corrected import

export function Menu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div
            className={`bg-gradient-to-r from-sky-400  to-blue-300 shadow-lg text-white h-screen ${
                isSidebarOpen ? "w-64" : "w-16"
            } transition-all duration-300 ease-in-out`}
        >
            <div className="p-4 flex flex-col h-full">
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none mb-4"
                >
                    <LiaBarsSolid
                        className={`w-6 h-6 transform transition-transform ${
                            isSidebarOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {isSidebarOpen && (
                    <>
                        <img
                            src="/src/assets/logo.png"
                            alt="Green Shadow Logo"
                            className="w-20 h-20 mx-auto rounded-full border-4 border-sky-300 shadow-lg"
                        />
                        <h2 className="text-center text-3xl font-bold mt-4">Adopet</h2>
                        <div className="bg-white w-full py-4 mt-6 text-center rounded-lg shadow-lg">
                            <h2 className="text-gray-500">Rashini Vithanage</h2>
                            <p className="text-sm text-gray-500">Admin</p>
                        </div>
                    </>
                )}

                <ul className="flex flex-col space-y-5 mt-5">
                    <li>
                        <Link
                            to="/home"
                            className="flex items-center space-x-4 p-2 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-200 dark:focus:ring-sky-100 font-medium text-m  text-center me-2 mb-2"
                        >
                            <LiaHomeSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="adopter"
                            className="flex items-center space-x-4 p-2 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-200 dark:focus:ring-sky-100 font-medium text-m  text-center me-2 mb-2"
                        >
                            <LiaUserFriendsSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Adopter</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="pet"
                            className="flex items-center space-x-4 p-2 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-200 dark:focus:ring-sky-100 font-medium text-m  text-center me-2 mb-2"
                        >
                            <LiaPawSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Pet</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="adoption-request"
                            className="flex items-center space-x-4 p-2 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-200 dark:focus:ring-sky-100 font-medium text-m  text-center me-2 mb-2"
                        >
                            <LiaEnvelopeOpenSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Adoption Request</span>}
                        </Link>
                    </li>
                    <li className="mt-auto">
                        <Link
                            to="/"
                            className="flex items-center space-x-4 p-2 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-200 dark:focus:ring-sky-100 font-medium text-m  text-center me-2 mb-2"
                        >
                            <LiaSignOutAltSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Log Out</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

}
