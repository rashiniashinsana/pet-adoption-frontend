import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Adopter } from "../../../model/Adopter.ts";
import { RootState } from "../../../store/store.tsx";

interface ViewAdopterPopupProps {
    targetAdopter: string;
    closePopupAction: (id: string) => void;
}

const ViewAdopterPopup = ({ targetAdopter, closePopupAction }: ViewAdopterPopupProps) => {
    const adopter = useSelector((state: RootState) => state.adopter);
    const [adopterData, setAdopterData] = useState<Adopter | null>(null);

    useEffect(() => {
        if (targetAdopter) {
            const selectedAdopter = adopter.find((adopter: Adopter) => adopter.adopter_id === targetAdopter);
            if (selectedAdopter) {
                setAdopterData(selectedAdopter);
            } else {
                console.warn("Adopter not found for the given targetAdopter ID");
            }
        }
    }, [targetAdopter, adopter]);

    if (!adopterData) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-2xl relative overflow-y-auto max-h-[90vh]">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => closePopupAction(targetAdopter)}
                >
                    &times;
                </button>
                <h2 className="mt-3 mb-6 text-2xl font-semibold text-center">View Adopter Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adopter ID</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={adopterData?.adopter_id}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={adopterData?.name}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={adopterData?.email}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={adopterData?.phone}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={adopterData?.address}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAdopterPopup;