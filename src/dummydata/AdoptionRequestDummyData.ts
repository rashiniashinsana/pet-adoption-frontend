import {AdoptionRequest} from "../model/AdoptionRequest.ts";

const adoptionRequestDummyData: AdoptionRequest[] = [{
    adopter_id: "AD001",
    pet_id: "P001",
    request_date: "2023-06-15",
    notes: "Looking for a small-sized dog for my apartment.",
    status: "pending",
    },
    {
        adopter_id: "AD002",
        pet_id: "P002",
        request_date: "2023-07-20",
        notes: "My family loves cats, and we'd like to adopt a playful one.",
        status: "pending",
    },
    {
        adopter_id: "AD003",
        pet_id: "P003",
        request_date: "2023-08-05",
        notes: "Interested in adopting a bird as a first-time pet owner.",
        status: "pending",
    },
    {
        adopter_id: "AD004",
        pet_id: "P004",
        request_date: "2023-09-10",
        notes: "Experienced dog owner looking for a large breed.",
        status: "pending",
    },
    {
        adopter_id: "AD005",
        pet_id: "P005",
        request_date: "2023-10-25",
        notes: "I want a hypoallergenic pet due to allergies.",
        status: "pending",
    },
    {
        adopter_id: "AD006",
        pet_id: "P006",
        request_date: "2023-11-30",
        notes: "I have a big backyard and want to adopt a rescue dog.",
        status: "pending",
    },
    {
        adopter_id: "AD007",
        pet_id: "P007",
        request_date: "2023-12-15",
        notes: "Looking for an affectionate and quiet pet for my elderly parents.",
        status: "pending",
    },
    {
        adopter_id: "AD008",
        pet_id: "P008",
        request_date: "2024-01-05",
        notes: "Seeking a therapy dog for emotional support.",
        status: "pending",
    },
    {
        adopter_id: "AD009",
        pet_id: "P009",
        request_date: "2024-02-14",
        notes: "Want to adopt a companion pet for my existing dog.",
        status: "pending",
    }];

export default adoptionRequestDummyData;