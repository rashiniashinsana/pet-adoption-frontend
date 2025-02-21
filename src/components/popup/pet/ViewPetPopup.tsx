import { useEffect, useState } from "react";
import { Pet } from "../../../model/Pet.ts";
import { RootState } from "../../../store/store.tsx";
import { useSelector } from "react-redux";

interface ViewPetPopupProps {
    targetPet: Pet;
    closePopupAction: (data: Pet) => void;
}

const ViewPetPopup = ({ targetPet, closePopupAction }: ViewPetPopupProps) => {
    const petList = useSelector((state: RootState) => state.pet);
    const [petData, setPetData] = useState<Pet | null>(null);

    useEffect(() => {
        const selectedPet = petList.find((p: Pet) => p.pet_id === targetPet.pet_id) || null;
        setPetData(selectedPet);
    }, [targetPet, petList]);

    if (!petData) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetPet)}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">View Pet Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pet ID</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={petData.pet_id} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={petData.name} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={petData.age} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Breed</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={petData.breed} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={petData.gender} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Health Status</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={petData.health_status} />
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <img
                        className="w-40 h-40 object-cover border rounded-lg"
                        src={petData.image ? URL.createObjectURL(petData.image) : "https://via.placeholder.com/150"}
                        alt="Pet Image"
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewPetPopup;
