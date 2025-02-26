import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Adopter } from "../model/Adopter.ts";
import HeaderComponent from "../components/header/HeaderComponent.tsx";
import { deleteAdopter, getAllAdopters } from "../slice/AdopterSlice.ts";
import SaveAdopterPopup from "../components/popup/adopter/SaveAdopterPopup.tsx";
import TableComponent from "../components/TableComponent.tsx";
import { convertAdopterArrayTo2DArray } from "../util/ArrayTo2DArray.ts";
import UpdateAdopterPopup from "../components/popup/adopter/UpdateAdopterPopup.tsx";
import ViewAdopterPopup from "../components/popup/adopter/ViewAdopterPopup.tsx";
import { AppDispatch } from "../store/store.tsx";

const AdopterPage = () => {
    const [saveAdopterPopup, setSaveAdopterPopup] = useState(false);
    const [updateAdopterPopup, setUpdateAdopterPopup] = useState(false);
    const [viewAdopterPopup, setViewAdopterPopup] = useState(false);
    const [search, setSearch] = useState("");
    const [targetAdopter, setTargetAdopter] = useState<Adopter>({} as Adopter);
    const [adopters2DArray, setAdopters2DArray] = useState<string[][]>([]);
    const adopter = useSelector((state: { adopter: Adopter[] }) => state.adopter);

    const dispatch = useDispatch<AppDispatch>();

    const handleAddAdopterPopup = () => setSaveAdopterPopup(!saveAdopterPopup);

    const handleUpdateAdopterPopup = (id: string) => {
        setUpdateAdopterPopup(!updateAdopterPopup);
        // @ts-ignore
        setTargetAdopter(id);
    };

    const handleViewAdopterPopup = (id: string) => {
        setViewAdopterPopup(!viewAdopterPopup);
        // @ts-ignore
        setTargetAdopter(id);
    };

    const handleDeleteAdopter = (adopter_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this adopter?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAdopter(adopter_id));
                Swal.fire("Deleted!", "Adopter has been deleted.", "success");
                dispatch(getAllAdopters());  // Re-fetch the adopters after deletion
            }
        });
    };

    useEffect(() => {
        dispatch(getAllAdopters());  // Fetch adopters when the component mounts
    }, [dispatch]);

    useEffect(() => {
        const filteredAdopters = convertAdopterArrayTo2DArray(adopter)
            .filter((adopter: string[]) => {
                const adopterName = adopter[0];
                return adopterName.toLowerCase().includes(search.toLowerCase());
            });
        setAdopters2DArray(filteredAdopters);
    }, [search, adopter]);



    return (
        <>
            {saveAdopterPopup && <SaveAdopterPopup closePopupAction={handleAddAdopterPopup} />}
            {updateAdopterPopup && targetAdopter && (
                <UpdateAdopterPopup
                    // @ts-ignore
                    targetAdopter={targetAdopter}
                    closePopupAction={() => setUpdateAdopterPopup(false)}
                />
            )}
            {viewAdopterPopup && targetAdopter && (
                <ViewAdopterPopup
                    // @ts-ignore
                    targetAdopter={targetAdopter}
                    closePopupAction={() => setViewAdopterPopup(false)}
                />
            )}

            {/* Header Section */}
            <div className="mt-6 bg-white shadow-md rounded-lg">
                <HeaderComponent
                    section="Adopter Management"
                    button="Add Adopter"
                    addPopupAction={handleAddAdopterPopup}
                    searchAction={setSearch}
                />
            </div>

            <div className="mt-6 bg-white shadow-md rounded-lg flex flex-col min-h-[calc(100vh-200px)] max-h-[500px]">
                <TableComponent
                    headersData={["Adopter ID", "Name", "Email", "Phone", "Address"]}
                    bodyData={adopters2DArray}
                    updatePopupAction={handleUpdateAdopterPopup}
                    viewPopupAction={handleViewAdopterPopup}
                    deletePopupAction={handleDeleteAdopter}
                />
            </div>
        </>
    );
};

export default AdopterPage;
