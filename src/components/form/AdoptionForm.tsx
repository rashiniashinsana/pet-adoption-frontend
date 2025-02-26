import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdoptionRequest } from "../../model/AdoptionRequest.ts";
import { saveAdoptionRequest } from "../../slice/AdoptionRequestSlice.ts";
import { RootState } from "../../store/store.tsx";

interface AdoptionFormProps {
    closePopupAction: () => void;
    adoptionToUpdate?: AdoptionRequest;
}

const AdoptionForm = ({ closePopupAction, adoptionToUpdate }: AdoptionFormProps) => {
    const [adoption, setAdoption] = useState<AdoptionRequest>({
        request_id: adoptionToUpdate?.request_id || "",
        adopter_id: adoptionToUpdate?.adopter_id || "",
        pet_id: adoptionToUpdate?.pet_id || "",
        request_date: adoptionToUpdate?.request_date || new Date().toISOString().split("T")[0],
        notes: adoptionToUpdate?.notes || "",
        status: adoptionToUpdate?.status || "pending",
    });

    const dispatch = useDispatch();
    const adopters = useSelector((state: RootState) => state.adopter);
    const pets = useSelector((state: RootState) => state.pet);


    useEffect(() => {
        if (adoptionToUpdate) {
            setAdoption({
                request_id: adoptionToUpdate.request_id,
                adopter_id: adoptionToUpdate.adopter_id,
                pet_id: adoptionToUpdate.pet_id,
                request_date: adoptionToUpdate.request_date,
                notes: adoptionToUpdate.notes,
                status: adoptionToUpdate.status,
            });
        }
    }, [adoptionToUpdate]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setAdoption((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveAdoption = async () => {
        if (!adoption.adopter_id || !adoption.pet_id) {
            alert("Please select both adopter and pet.");
            return;
        }

        try {
            // @ts-ignore
            await dispatch(saveAdoptionRequest(adoption)).unwrap();  // Use unwrap to catch rejection in Redux Toolkit
            alert("Adoption request saved successfully.");
            closePopupAction();
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.message || "Failed to save adoption request.";
            alert(errorMessage);
        }
    };


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                    onClick={closePopupAction}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 className="mb-5 text-2xl font-bold text-gray-800 text-center">Adoption Request Form</h2>
                <div className="space-y-4">
                    <select
                        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-cyan-500"
                        name="adopter_id"
                        value={adoption.adopter_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Adopter</option>
                        {adopters.map((adopter) => (
                            <option key={adopter.adopter_id} value={adopter.adopter_id}>
                                {adopter.name} (ID: {adopter.adopter_id})
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-cyan-500"
                        name="pet_id"
                        value={adoption.pet_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Pet</option>
                        {pets.map((pet) => (
                            <option key={pet.pet_id} value={pet.pet_id}>
                                {pet.name} (ID: {pet.pet_id})
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-cyan-500"
                        name="request_date"
                        value={adoption.request_date}
                        onChange={handleChange}
                    />

                    <textarea
                        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-cyan-500"
                        placeholder="Notes (optional)"
                        name="notes"
                        rows={4}
                        value={adoption.notes}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all"
                        onClick={handleSaveAdoption}
                    >
                        {adoptionToUpdate ? "Update Request" : "Send Request"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdoptionForm;
