import { useEffect, useState } from "react";
import { RootState } from "../../../store/store.tsx";
import { useSelector } from "react-redux";
import { AdoptionRequest } from "../../../model/AdoptionRequest.ts";

interface ViewAdoptionPopupProps {
    targetRequest: AdoptionRequest;
    closePopupAction: (data: AdoptionRequest) => void;
}

const ViewAdoptionRequestPopup = ({ targetRequest, closePopupAction }: ViewAdoptionPopupProps) => {
    const requestList = useSelector((state: RootState) => state.request);
    const [requestData, setRequestData] = useState<AdoptionRequest | null>(null);

    useEffect(() => {
        if (targetRequest) {
            const selectedRequest = requestList.find(
                (request: AdoptionRequest) =>
                    request.request_id === targetRequest.request_id &&
                    request.pet_id === targetRequest.pet_id &&
                    request.adopter_id === targetRequest.adopter_id
            );
            setRequestData(selectedRequest || null);
        }
    }, [targetRequest, requestList]);

    if (!requestData) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-96 h-96 p-6 bg-white rounded-lg shadow-lg relative flex flex-col justify-center items-center">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetRequest)}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">View Adoption Request</h2>
                <div className="grid grid-cols-1 gap-4 w-full">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pet ID</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={requestData.pet_id} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adopter Name</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={requestData.adopter_id} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Request Date</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={requestData.request_date} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly value={requestData.notes || "No additional notes"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAdoptionRequestPopup;
