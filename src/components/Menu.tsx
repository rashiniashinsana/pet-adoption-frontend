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
            className={`bg-gray-800 text-white h-screen ${
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
                            src="/src/assets/logowithoutbg.png"
                            alt="Green Shadow Logo"
                            className="w-16 h-16 mx-auto"
                        />
                        <h2 className="text-center text-3xl font-bold">Adopet</h2>
                        <div className="bg-white w-full py-4 mt-6 text-center rounded-lg">
                            <h2 className="text-green-600">Rashini Vithanage</h2>
                            <p className="text-sm text-gray-500">Admin</p>
                        </div>
                    </>
                )}

                <ul className="flex flex-col space-y-5 mt-5">
                    <li>
                        <Link
                            to="/"
                            className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
                        >
                            <LiaHomeSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/adopter"
                            className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
                        >
                            <LiaUserFriendsSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Adopter</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pet"
                            className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
                        >
                            <LiaPawSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Pet</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/place-order"
                            className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
                        >
                            <LiaEnvelopeOpenSolid className="w-6 h-6"/>
                            {isSidebarOpen && <span>Adoption Request</span>}
                        </Link>
                    </li>
                    <li className="mt-auto">
                        <Link
                            to="/logout"
                            className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-blue-700 hover:text-gray-200"
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
