import { useSelector } from "react-redux";
import {AdoptionRequest} from "../../model/AdoptionRequest.ts";
import {RootState} from "../../store/store.tsx";

function RequestBox() {
    const adoptionRequests: AdoptionRequest[] = useSelector((state: RootState) => state.request);

    const approvedCount = adoptionRequests.filter((adoptionRequests) => adoptionRequests.status.toLowerCase() === "approved").length;
    const rejectedCount = adoptionRequests.filter((adoptionRequests) => adoptionRequests.status.toLowerCase() === "rejected").length;

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 w-70 h-70">
            <h2 className="text-lg font-semibold mb-4 text-center">Adoption Requests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 w-40 h-100">
                <div
                    className="bg-purple-100 text-center py-6 rounded-lg flex flex-col items-center justify-center h-50"
                >
                    <p
                        className="text-6xl sm:text-7xl font-bold mb-2 sm:mb-4"
                        id="approved-request-count"
                    >
                        {approvedCount}
                    </p>
                    <p className="text-base sm:text-sm">Approved</p>
                </div>
                <div
                    className="bg-red-100 text-center py-6 rounded-lg flex flex-col items-center justify-center h-full"
                >
                    <p
                        className="text-6xl sm:text-7xl font-bold mb-2 sm:mb-4"
                        id="rejected-request-count"
                    >
                        {rejectedCount}
                    </p>
                    <p className="text-base sm:text-sm">Rejected</p>
                </div>
            </div>
        </div>
    );
}

export default RequestBox;
