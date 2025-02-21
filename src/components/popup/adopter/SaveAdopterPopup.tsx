import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Adopter } from "../../../model/Adopter.ts";
import { generateUUID } from "../../../util/generateUUID.ts";
import {saveAdopter} from "../../../slice/AdopterSlice.ts";
import {AppDispatch} from "../../../store/store.tsx";

interface SaveAdopterProps {
    closePopupAction: () => void;
    adopterToUpdate?: Adopter;
}

const SaveAdopterPopup = ({ closePopupAction, adopterToUpdate }: SaveAdopterProps) => {
    const [adopter, setAdopter] = useState<Adopter>({
        adopter_id: adopterToUpdate?.adopter_id || generateUUID("ADOPTER"),
        name: adopterToUpdate?.name || "",
        email: adopterToUpdate?.email || "",
        phone: adopterToUpdate?.phone || "",
        address: adopterToUpdate?.address || "",
    });
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdopter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveAdopter = () => {
        if (!adopter.name || !adopter.email || !adopter.phone || !adopter.address) {
            toast.error("Please fill in all the fields.");
            return;
        }

        try {

            dispatch(saveAdopter(adopter));
            toast.success("Adopter saved successfully.");
            closePopupAction();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save adopter.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-2xl relative z-50 border border-gray-400">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={closePopupAction}
                >
                    &times;
                </button>
                <h2 className="mb-6 text-2xl font-semibold text-gray-700 text-center border-b pb-2">Save Adopter</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        placeholder="Enter Adopter Name"
                        name="name"
                        value={adopter.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        placeholder="Enter Adopter Email"
                        name="email"
                        value={adopter.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        placeholder="Enter Adopter Phone"
                        name="phone"
                        value={adopter.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        placeholder="Enter Adopter Address"
                        name="address"
                        value={adopter.address}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 border border-cyan-700"
                        onClick={handleSaveAdopter}
                    >
                        Save Adopter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveAdopterPopup;
