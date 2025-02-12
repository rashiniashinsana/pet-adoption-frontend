import React, {useState} from "react";
import { EyeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {AdoptionRequest} from "../../model/AdoptionRequest.ts";

interface AdoptionRequestCardProps {
    adoptionData: AdoptionRequest;
    handleApproveAdoption: (data: AdoptionRequest) => void;
    handleRejectAdoption: (data: AdoptionRequest) => void;
    handleViewAdoption: (data: AdoptionRequest) => void;
}

const AdoptionRequestCard: React.FC<AdoptionRequestCardProps> = ({
                                                                     adoptionData,
                                                                     handleApproveAdoption,
                                                                     handleRejectAdoption,
                                                                     handleViewAdoption}) => {
    const [showFullNotes, setShowFullNotes] = useState(false);
    const toggleNotes = () => setShowFullNotes(!showFullNotes);

    return (
        <>
            <div className="bg-white rounded-lg shadow-md border-l-4 p-4 flex-justify-center max-w-md md:max-w-2xl mx-auto border-sky-500 flex flex-col gap-2">
                {/* Header */}
                <div className="text-gray-500 text-xs font-semibold">TODAY</div>
                 <p className="text-sm text-gray-500">Request Date: {adoptionData.request_date}</p>

                {/* Request Details */}
                <div className="text-gray-700">
                    <p><span className="font-semibold">Adopter ID:</span> {adoptionData.adopter_id}</p>
                    <p><span className="font-semibold">Pet ID:</span> {adoptionData.pet_id}</p>
                    <p><span className="font-semibold">Status:</span> {adoptionData.status}</p>
                    {adoptionData.notes && (
                        <p className="mt-1">
                            <span className="font-semibold">Notes: </span>
                            {showFullNotes ? adoptionData.notes : `${adoptionData.notes.slice(0, 30)}...`}
                            {adoptionData.notes.length > 10 && (
                                <button onClick={toggleNotes} className="text-blue-500 ml-1 text-sm">
                                    {showFullNotes ? "Show less" : "Read more"}
                                </button>
                            )}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-3">

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleViewAdoption(adoptionData)}
                            className="flex items-center px-3 py-1 bg-blue-400 text-white rounded-lg hover:bg-sky-300 text-sm"
                        >
                            <EyeIcon className="h-4 w-4 mr-1"/> View
                        </button>
                        <button
                            onClick={() => handleApproveAdoption(adoptionData)}
                            className="flex items-center px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-300 text-sm"
                        >
                            <CheckCircleIcon className="h-5 w-5 mr-1"/>
                            Approve
                        </button>
                        <button
                            onClick={() => handleRejectAdoption(adoptionData)}
                            className="flex items-center px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-300 text-sm"
                        >
                            <XCircleIcon className="h-5 w-5 mr-1"/>
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default AdoptionRequestCard;
