import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Pet } from "../model/Pet.ts";
import SavePetPopup from "../components/popup/pet/SavePetPopup.tsx";
import UpdatePetPopup from "../components/popup/pet/UpdatePetPopup.tsx";
import ViewPetPopup from "../components/popup/pet/ViewPetPopup.tsx";
import HeaderComponent from "../components/header/HeaderComponent.tsx";
import CardSet from "../components/CardSet.tsx";
import AdoptionForm from "../components/form/AdoptionForm.tsx";
import {deletePet, getAllPets} from "../slice/PetSlice.ts";
import {AdoptionRequest} from "../model/AdoptionRequest.ts";
import {AppDispatch} from "../store/store.tsx";

const PetPage = () => {
    const [savePetPopup, setSavePetPopup] = useState(false);
    const [updatePetPopup, setUpdatePetPopup] = useState(false);
    const [viewPetPopup, setViewPetPopup] = useState(false);
    const [adoptPetPopup, setAdoptPetPopup] = useState(false);
    const [search, setSearch] = useState("");
    const petsData = useSelector((state: { pet: Pet[] }) => state.pet)
    const [targetPet, setTargetPet] = useState<Pet>({} as Pet);
    const dispatch = useDispatch<AppDispatch>();
    const [pets, setPets] = useState(petsData)


    const handleAddPetPopup = () => {
        setSavePetPopup(!savePetPopup);
    }
    const handleUpdatePetPopup = (data: Pet | AdoptionRequest) => {
        setTargetPet(data as Pet);
        setUpdatePetPopup(prevState => !prevState);

    };

    const handleViewPetPopup = (data: Pet | AdoptionRequest) => {
        setTargetPet(data as Pet);
        setViewPetPopup(prevState => !prevState);
    };

    const handleAdoptPetPopup = (data: Pet | AdoptionRequest) => {
        setTargetPet(data as Pet);
        setAdoptPetPopup(!adoptPetPopup);
    };

    useEffect(() => {
        const filteredPets = petsData.filter((pet: Pet) => {
            return pet.name.toLowerCase().includes(search.toLowerCase())
        })
        setPets(filteredPets)
    }, [search, petsData])

    useEffect(() => {
        dispatch(getAllPets());
    }, [dispatch]);




    const handleDeletePet = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this vehicle?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePet(id))
                Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Vehicle deletion cancelled", "info");
            }
        })
    };


    return (
        <>
            {savePetPopup && <SavePetPopup closePopupAction={handleAddPetPopup} />}
            {updatePetPopup && targetPet && <UpdatePetPopup  closePopupAction={() => setUpdatePetPopup(false)} targetPet={targetPet} />}
            {viewPetPopup && targetPet && <ViewPetPopup  closePopupAction={() => setViewPetPopup(false)} targetPet={targetPet} />}
            {adoptPetPopup && <AdoptionForm closePopupAction={() => setAdoptPetPopup(false)} />}

            <div className="mt-6 bg-white shadow-lg rounded-lg">
                <HeaderComponent section="Pet Management" button="Add Pet" addPopupAction={handleAddPetPopup} searchAction={setSearch} />
            </div>

            <div className="p-4 bg-white shadow-lg rounded-xl min-h-[calc(100vh-200px)] max-h-[600px] mt-5">
                <div className="max-h-[600px] overflow-y-auto">
                    <CardSet cardType="pet" cardSet={pets} handleUpdatePopup={handleUpdatePetPopup} handleViewPopup={handleViewPetPopup} handleDeletePopup={handleDeletePet} handleAdoptPopup={handleAdoptPetPopup} />
                </div>
            </div>
        </>
    );
};

export default PetPage;