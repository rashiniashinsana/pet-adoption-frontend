import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Pet } from "../../../model/Pet.ts";
import { toast } from "react-toastify";
import { updatePet } from "../../../slice/PetSlice.ts";
import petValidation from "../../../util/validation/PetValidation.ts";

interface UpdatePetPopupProps {
    closePopupAction: (data: Pet) => void;
    targetPet: Pet;
}

const UpdatePetPopup = ({ closePopupAction, targetPet }: UpdatePetPopupProps) => {
    const imageRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();


    const [petData, setPet] = useState<Pet>({
        pet_id: targetPet.pet_id,
        name: targetPet.name,
        age: targetPet.age,
        breed: targetPet.breed,
        gender: targetPet.gender,
        health_status: targetPet.health_status,
        image: targetPet.image,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = e.target.files?.[0]; // Ensure it's a file input before accessing files
            if (file) {
                setPet((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));
            }
            return;
        }

        // Handle other input types (text, select, etc.)
        setPet((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleUpdatePet = () => {
        if (!petValidation(petData.name, petData.age, petData.breed, petData.gender, petData.health_status, petData.image)) {
            toast.error("Invalid field data");
            return;
        }

        try {
            dispatch(updatePet(petData));
            closePopupAction(petData);
            toast.success("Pet updated successfully");
        } catch (e) {
            console.error(e);
            toast.error("An error occurred while updating the pet");
        }
    };

     const handleSetDefaultImage = (image:  File, imageRef: React.RefObject<HTMLInputElement>) => {

        if (imageRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(image);
            imageRef.current.files = dataTransfer.files;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl relative border border-gray-300">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetPet)}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-5 border-b pb-2">Update Pet</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter pet name"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={petData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter pet age"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={petData.age}
                        onChange={handleChange}
                    />
                    <select
                        name="gender"
                        className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={petData.breed}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Breed</option>
                        <option value="CAT">Cat</option>
                        <option value="DOG">Dog</option>
                    </select>
                    <select
                        name="gender"
                        className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={petData.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>
                    <input
                        type="text"
                        name="health_status"
                        placeholder="Enter health status"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:border-cyan-400 focus:ring-cyan-400"
                        value={petData.health_status}
                        onChange={handleChange}
                    />
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            ref={imageRef}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="button"
                            className="mt-2  py-1 px-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                            onClick={() => handleSetDefaultImage(targetPet.image as File, imageRef)}
                        >
                            Set Old Image
                        </button>
                    </div>
                    <button
                        type="button"
                        className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        onClick={handleUpdatePet}
                    >
                        Update Pet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePetPopup;
