import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Adopter } from "../../../model/Adopter.ts";
import { updateAdopter } from "../../../slice/AdopterSlice.ts";
import { RootState } from "../../../store/store.tsx";
import validateAdopter from "../../../util/validation/AdopterValidation.ts";

interface UpdateAdopterPopupProps {
    closePopupAction: (id: string) => void;
    targetAdopter: string;
}

const UpdateAdopterPopup = ({ closePopupAction, targetAdopter }: UpdateAdopterPopupProps) => {
    const adopters = useSelector((state: RootState) => state.adopter);
    const [adopterData, setAdopterData] = useState<Adopter>({
        adopter_id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        setAdopterData(adopters.find((adopter: Adopter) => adopter.adopter_id === targetAdopter) as Adopter);
    }, [adopters, targetAdopter]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdopterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateAction = () => {
        if (!validateAdopter(adopterData)){
            toast.error("Please fill in all fields correctly.");
            return;
        }
        dispatch(updateAdopter(adopterData));
        toast.success("Adopter updated successfully.");
        closePopupAction("");
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-2xl relative z-50 border border-gray-400">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction("")}
                >
                    &times;
                </button>
                <h2 className="mb-6 text-2xl font-semibold text-gray-700 text-center border-b pb-2">Update Adopter</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={adopterData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                        placeholder="Enter Adopter Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={adopterData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                        placeholder="Enter Adopter Email"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={adopterData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                        placeholder="Enter Adopter Phone"
                    />
                    <input
                        type="text"
                        name="address"
                        value={adopterData.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                        placeholder="Enter Adopter Address"
                    />
                    <button
                        type="button"
                        onClick={updateAction}
                        className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 border border-cyan-700"
                    >
                        Update Adopter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAdopterPopup;
