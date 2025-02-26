import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AdoptionRequest } from "../model/AdoptionRequest.ts";
import {approveAdoptionRequest, getAllAdoptionRequests, rejectAdoptionRequest} from "../slice/AdoptionRequestSlice.ts";
import HeaderComponent from "../components/header/HeaderComponent.tsx";
import { AppDispatch, RootState } from "../store/store.tsx";
import CardSet from "../components/CardSet.tsx";
import ViewAdoptionRequestPopup from "../components/popup/request/ViewAdoptionRequestPopup.tsx";
import AdoptionForm from "../components/form/AdoptionForm.tsx";
import {Pet} from "../model/Pet.ts";
import {toast} from "react-toastify";

const AdoptionRequestPage = () => {
    const [viewAdoptionRequestPopup, setViewAdoptionRequestPopup] = useState(false);
    const [adoptPetPopup, setAdoptPetPopup] = useState(false);
    const [search, setSearch] = useState("");
    const [targetAdoptionRequest, setTargetAdoptionRequest] = useState<AdoptionRequest | null>(null);
    const request = useSelector((state: RootState) => state.request);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
         dispatch(getAllAdoptionRequests());
    }, [dispatch]);

    const handleAddAdoptionRequest = () => {
        console.log("Add Adoption Request clicked");
        setAdoptPetPopup(!adoptPetPopup);
        toast.success("Request added successfully");
    }

    const handleViewAdoptionRequestPopup = (data: AdoptionRequest | Pet): void => {
        if ("adopter_id" in data && "request_date" in data) {
            setTargetAdoptionRequest(data); // ✅ Safe because we ensured it's AdoptionRequest
            setViewAdoptionRequestPopup(true);
        } else {
            console.error("Invalid data type for adoption request popup");
        }
    };


    const handleApproveAdoptionRequest = (data: AdoptionRequest | Pet): void => {
        if ("adopter_id" in data && "request_date" in data) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to approve this adoption request?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, approve it!",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(approveAdoptionRequest(data as AdoptionRequest)); // ✅ Type assertion
                    Swal.fire("Approved!", "Adoption request has been approved.", "success");
                } else {
                    Swal.fire("Cancelled", "Adoption request approval cancelled", "info");
                }
            });
        } else {
            console.error("Invalid data type received for approval.");
        }
    };

    const handleRejectAdoptionRequest = (data: AdoptionRequest | Pet): void => {
        if ("adopter_id" in data && "request_date" in data) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to reject this adoption request?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, reject it!",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(rejectAdoptionRequest(data as AdoptionRequest)); // ✅ Type assertion
                    Swal.fire("Rejected!", "Adoption request has been rejected.", "success");
                } else {
                    Swal.fire("Cancelled", "Adoption request rejection cancelled", "info");
                }
            });
        } else {
            console.error("Invalid data type received for rejection.");
        }
    };

    const filteredAdoptionRequests: AdoptionRequest[] = request.filter(
        (request: AdoptionRequest) =>
            request.adopter_id?.toLowerCase().includes(search.toLowerCase()) ||
            request.pet_id?.toLowerCase().includes(search.toLowerCase()) ||
            request.status?.toLowerCase().includes(search.toLowerCase())
    ) as AdoptionRequest[];

    return (
        <>
            {viewAdoptionRequestPopup && targetAdoptionRequest && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
                    <ViewAdoptionRequestPopup
                        targetRequest={targetAdoptionRequest}
                        closePopupAction={() => setViewAdoptionRequestPopup(false)}
                    />
                </div>
            )}
            {adoptPetPopup && <AdoptionForm closePopupAction={handleAddAdoptionRequest} />}

            <div className="mt-6 bg-white shadow-lg rounded-lg">
                <HeaderComponent
                    section="Adoption Requests"
                    button="Add Request"
                    addPopupAction={handleAddAdoptionRequest}
                    searchAction={setSearch}
                />
            </div>

            <div className="p-4 m-1 bg-white shadow-lg rounded-xl min-h-[calc(100vh-200px)] max-h-[600px] mt-5 gap-10 ">
                <div className="max-h-[600px] overflow-y-auto">
                    <CardSet
                        cardType={"adoptionRequest"}
                        cardSet={filteredAdoptionRequests}
                        handleApprovePopup={handleApproveAdoptionRequest}
                        handleViewPopup={handleViewAdoptionRequestPopup}
                        handleRejectPopup={handleRejectAdoptionRequest}
                    />
                </div>
            </div>
        </>
    );
};

export default AdoptionRequestPage;
