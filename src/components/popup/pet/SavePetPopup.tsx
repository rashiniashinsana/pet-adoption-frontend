import React, { useEffect, useState } from "react";
import { Pet } from "../../../model/Pet.ts";
import { useDispatch } from "react-redux";
import validatePet from "../../../util/validation/PetValidation.ts";
import { toast } from "react-toastify";
import { generateUUID } from "../../../util/generateUUID.ts";
import { savePet } from "../../../slice/PetSlice.ts";

interface SavePetProps {
    closePopupAction: () => void;
    petToUpdate?: Pet;
}

const SavePetPopup = ({ closePopupAction, petToUpdate }: SavePetProps) => {
    const [pet, setPet] = useState<Pet>({
        pet_id: petToUpdate?.pet_id || generateUUID("PET"),
        name: petToUpdate?.name || "",
        age: petToUpdate?.age || "",
        breed: petToUpdate?.breed || "",
        gender: petToUpdate?.gender || "",
        health_status: petToUpdate?.health_status || "",
        image: petToUpdate?.image || "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (petToUpdate) {
            setPet(petToUpdate);
        }
    }, [petToUpdate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPet({ ...pet, image: URL.createObjectURL(file) });
        }
    };

    const handleSavePet = async () => {
        if (!validatePet(pet.name, pet.age, pet.breed, pet.gender, pet.health_status, pet.image)) return;

        try {
            let uploadImageURL = pet.image; // Use existing image if not updating

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("upload_preset", "adopet"); // Use correct preset
                formData.append("cloud_name", "dsakcdy1i");

                const res = await fetch("https://api.cloudinary.com/v1_1/dsakcdy1i/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadResponse = await res.json();
                uploadImageURL = uploadResponse.secure_url;

                if (!uploadImageURL) {
                    toast.error("Failed to upload image.");
                    return;
                }

                console.log("Image uploaded successfully:", uploadImageURL);
            }

            // Update pet image with Cloudinary URL
            const petData = { ...pet, image: uploadImageURL };


            dispatch(savePet(petData));
            toast.success("Pet saved successfully.");
            closePopupAction();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save pet.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl relative border border-gray-300">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={closePopupAction}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-5 border-b pb-2">Save Pet</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter pet name"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        value={pet.name}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter pet age"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        value={pet.age}
                        onChange={handleChange}
                    />
                    <select
                        name="breed"
                        value={pet.breed}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                    >
                        <option value="" disabled>Select Breed</option>
                        <option value="StreetDog">StreetDog</option>
                        <option value="StreetCat">StreetCat</option>
                        <option value="Labrador">Labrador</option>
                        <option value="Persian">Persian</option>
                        <option value="German Shepherd">German Shepherd</option>
                        <option value="Golden Retriever">Golden Retriever</option>
                        <option value="Bulldog">Bulldog</option>
                        <option value="Husky">Husky</option>
                    </select>
                    <select
                        name="gender"
                        value={pet.gender}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>
                    <input
                        type="text"
                        name="health_status"
                        placeholder="Enter health status"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                        value={pet.health_status}
                        onChange={handleChange}
                    />
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
                            onChange={handleFileUpload}
                        />
                        {pet.image && <img src={pet.image} alt="Preview" className="mt-2 h-24 rounded-md" />}
                    </div>
                    <button
                        type="button"
                        className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition ease-in-out duration-200"
                        onClick={handleSavePet}
                    >
                        Save Pet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavePetPopup;
