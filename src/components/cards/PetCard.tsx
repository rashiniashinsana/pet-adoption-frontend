import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Pet } from "../../model/Pet.ts";
import { dataRefactor } from "../../util/dataRefactor.ts";

interface PetCardProps {
    petData: Pet;
    handleUpdatePetPopup: (pet: Pet) => void;
    handleViewPetPopup: (pet: Pet) => void;
    handleDeletePetPopup: (pet_id: string) => void;
    handleAdoptPetPopup: (pet: Pet) => void;
}

const PetCard = ({ petData, handleUpdatePetPopup, handleViewPetPopup, handleDeletePetPopup, handleAdoptPetPopup }: PetCardProps) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-xl border border-gray-200 w-full max-w-xs mx-auto">
            <div className="w-full h-48 overflow-hidden rounded-lg flex justify-center items-center bg-gray-100">
                <img
                    className="w-full h-full object-cover"
                    src={
                        !petData.image
                            ? "https://via.placeholder.com/150"
                            : URL.createObjectURL(petData.image)
                    }
                    alt="Pet"
                />
            </div>

            <div className="mt-4 space-y-3 text-center">
                <div className="flex justify-around text-sm text-gray-600">
                    <div>
                        <p className="font-medium text-gray-500">ID</p>
                        <p className="font-semibold text-gray-800">{dataRefactor(petData.pet_id, 20)}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Age</p>
                        <p className="font-semibold text-gray-800">{dataRefactor(petData.age, 10)}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Gender</p>
                        <p className="font-semibold text-gray-800">{dataRefactor(petData.gender, 10)}</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800">{petData.name}</h2>
                <p className="text-gray-500 text-sm">{petData.breed}</p>
            </div>

            <div className="mt-3 text-sm text-gray-600">
                <p>{petData.health_status}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => handleAdoptPetPopup(petData)}
                    className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold transition-all duration-200"
                >
                    Adopt
                </button>
                <div className="flex space-x-3">
                    <button onClick={() => handleViewPetPopup(petData)} className="text-gray-500 hover:text-blue-400">
                        <EyeIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleUpdatePetPopup(petData)} className="text-gray-500 hover:text-green-400">
                        <PencilIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleDeletePetPopup(petData.pet_id)} className="text-gray-500 hover:text-red-400">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
