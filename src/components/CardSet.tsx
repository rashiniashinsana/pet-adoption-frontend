import { Pet } from "../model/Pet.ts";
import { AdoptionRequest } from "../model/AdoptionRequest.ts";
import AdoptionRequestCard from "./cards/AdoptionRequestCard.tsx";
import PetCard from "./cards/PetCard.tsx";

interface CardSetProps {
    cardType: string;
    cardSet: Pet[] | AdoptionRequest[];
    handleApprovePopup?: (data: AdoptionRequest) => void;
    handleUpdatePopup?: (data: Pet) => void;
    handleViewPopup?: (data: Pet | AdoptionRequest) => void;
    handleDeletePopup?: (id: string) => void;
    handleRejectPopup?: (data: AdoptionRequest) => void;
    handleAdoptPopup?: (data: Pet) => void;
}

const CardSet = ({
                     cardType,
                     cardSet,
                     handleApprovePopup,
                     handleUpdatePopup,
                     handleViewPopup,
                     handleDeletePopup,
                     handleRejectPopup,
                     handleAdoptPopup,
                 }: CardSetProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-5 w-full">
            {cardSet.map((cardData, index) => {
                if (cardType === "pet") {
                    return (
                        <PetCard
                            key={(cardData as Pet).pet_id || index}
                            petData={cardData as Pet}
                            handleUpdatePetPopup={handleUpdatePopup as (data: Pet) => void}
                            handleViewPetPopup={handleViewPopup as (data: Pet) => void}
                            handleDeletePetPopup={handleDeletePopup as (id: string) => void}
                            handleAdoptPetPopup={handleAdoptPopup as (data: Pet) => void}
                        />
                    );
                } else if (cardType === "adoptionRequest") {
                    return (
                        <AdoptionRequestCard
                            key={(cardData as AdoptionRequest).adopter_id || index}
                            adoptionData={cardData as AdoptionRequest}
                            handleViewAdoption={handleViewPopup as (data: AdoptionRequest) => void}
                            handleApproveAdoption={handleApprovePopup as (data: AdoptionRequest) => void}
                            handleRejectAdoption={handleRejectPopup as (data: AdoptionRequest) => void}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default CardSet;