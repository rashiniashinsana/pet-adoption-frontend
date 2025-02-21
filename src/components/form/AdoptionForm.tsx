import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdoptionRequest } from "../../model/AdoptionRequest.ts";
import { saveAdoptionRequest } from "../../slice/AdoptionRequestSlice.ts";
import { RootState } from "../../store/store.tsx";

interface AdoptionFormProps {
    closePopupAction: () => void;
    adoptionToUpdate?: AdoptionRequest;
}

const AdoptionForm = ({ closePopupAction, adoptionToUpdate }: AdoptionFormProps) => {
    const [adoption, setAdoption] = useState<AdoptionRequest>({
        adopter_id: adoptionToUpdate?.adopter_id || "",
        pet_id: adoptionToUpdate?.pet_id || "",
        request_date: adoptionToUpdate?.request_date || "",
        notes: adoptionToUpdate?.notes || "",
        status: adoptionToUpdate?.status || "pending",
    });

    const dispatch = useDispatch();
    const adopters = useSelector((state: RootState) => state.adopter);
    const pets = useSelector((state: RootState) => state.pet);

    useEffect(() => {
        if (adoptionToUpdate) {
            setAdoption({
                adopter_id: adoptionToUpdate.adopter_id,
                pet_id: adoptionToUpdate.pet_id,
                request_date: adoptionToUpdate.request_date,
                notes: adoptionToUpdate.notes,
                status: adoptionToUpdate.status,
            });
        }
    }, [adoptionToUpdate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAdoption((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveAdoption = () => {
        try {
            // @ts-ignore
            dispatch(saveAdoptionRequest(adoption));
            toast.success("Adoption request saved successfully.");
            closePopupAction();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save adoption request.");
        }
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="w-96 p-6 bg-white rounded-lg shadow-lg relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closePopupAction}>
                    ×
                </button>
                <h2 className="mb-4 text-xl font-semibold text-gray-700">Adoption Request Form</h2>
                <div className="space-y-3">
                    <select
                        className="w-full p-3 border rounded bg-gray-100 text-gray-600"
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
                        className="w-full p-3 border rounded bg-gray-100 text-gray-600"
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
                        className="w-full p-3 border rounded bg-gray-100 text-gray-600"
                        name="request_date"
                        value={adoption.request_date}
                        onChange={handleChange}
                    />

                    <textarea
                        className="w-full p-3 border rounded bg-gray-100 text-gray-600"
                        placeholder="Notes"
                        name="notes"
                        value={adoption.notes}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="w-full p-3 bg-cyan-500 text-white rounded hover:bg-cyan-800"
                        onClick={handleSaveAdoption}
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdoptionForm;
