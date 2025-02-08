import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AdoptionRequest } from "../../../model/AdoptionRequest.ts";
import { toast } from "react-toastify";
import { updatePet } from "../../../slice/PetSlice.ts"; // Assuming you want to update the pet
import adoptionRequestValidation from "../../../util/validation/AdoptionRequestValidation.ts";

interface UpdateRequestPopupProps {
    closePopupAction: (data: AdoptionRequest) => void;
    targetRequest: AdoptionRequest;
}

const UpdateRequestPopup = ({ closePopupAction, targetRequest }: UpdateRequestPopupProps) => {
    const dispatch = useDispatch();

    // Add the 'status' field to your state
    const [requestData, setRequest] = useState<AdoptionRequest>({
        adopter_id: targetRequest.adopter_id,
        pet_id: targetRequest.pet_id,
        request_date: targetRequest.request_date,
        notes: targetRequest.notes,
        status: "pending", // Default status
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = e.target.files?.[0]; // Ensure it's a file input before accessing files
            if (file) {
                setRequest((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));
            }
            return;
        }

        // Handle other input types (text, select, etc.)
        setRequest((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleApproveRequest = () => {
        setRequest((prevData) => ({
            ...prevData,
            status: "approved", // Update status to approved
        }));
        toast.success("Request approved");
    };

    const handleRejectRequest = () => {
        setRequest((prevData) => ({
            ...prevData,
            status: "rejected", // Update status to rejected
        }));
        toast.error("Request rejected");
    };

    const handleUpdateAdoptionRequest = () => {
        if (!adoptionRequestValidation(requestData.adopter_id, requestData.pet_id, requestData.request_date, requestData.notes , requestData.status)) {
            toast.error("Invalid request data");
            return;
        }

        try {
            dispatch(updatePet(requestData)); // Ensure correct action is dispatched
            closePopupAction(requestData);
            toast.success("Request updated successfully");
        } catch (e) {
            console.error(e);
            toast.error("An error occurred while updating the request");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl relative border border-gray-300">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetRequest)}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-5 border-b pb-2">Update Request</h2>
                <div className="space-y-4">
                    <select
                        className="w-full p-3 border rounded bg-gray-100 text-gray-600"
                        name="adopter_id"
                        value={requestData.adopter_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Adopter</option>
                        {/* Map over adopters here */}
                    </select>

                    <input
                        type="datetime-local"
                        name="request_date"
                        placeholder="Enter date"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={requestData.request_date}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="notes"
                        placeholder="Enter notes"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={requestData.notes}
                        onChange={handleChange}
                    />

                    <div className="flex justify-between space-x-4">
                        <button
                            type="button"
                            className="w-1/2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={handleApproveRequest}
                        >
                            Approve
                        </button>

                        <button
                            type="button"
                            className="w-1/2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={handleRejectRequest}
                        >
                            Reject
                        </button>
                    </div>

                    <button
                        type="button"
                        className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        onClick={handleUpdateAdoptionRequest}
                    >
                        Update Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateRequestPopup;
