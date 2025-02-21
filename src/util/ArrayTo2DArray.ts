import {Adopter} from "../model/Adopter.ts";
// import {Pet} from "../model/Pet.ts";
import {AdoptionRequest} from "../model/AdoptionRequest.ts";


export const convertAdopterArrayTo2DArray = (adopterArray : Adopter[]) => {
    return adopterArray.map((adopter) => [
        adopter.adopter_id.toString(),
        adopter.name ?? "",
        adopter.email ?? "",
        adopter.phone ?? "",
        adopter.address ?? "",
    ]);
}

// export const convertPetArrayTo2DArray = (petArray : Pet[]) => {
//     return petArray.map((pet) => [
//         pet.pet_id ?? "",
//         pet.name ?? "",
//         pet.age ?? "",
//         pet.breed ?? "",
//         pet.type === "" ? "Female" : "Male",
//         pet.health_status ?? "",
//         pet.image ?? "",
//     ]);
// }

export const convertAdoptionRequestArrayTo2DArray = (adoptionrequestArray : AdoptionRequest[]) => {
    return adoptionrequestArray.map((adoptionRequest) => [
        adoptionRequest.adopter_id === "" ? "Available" : "Assigned",
        adoptionRequest.pet_id === "" ? "Available" : "Assigned",
        adoptionRequest.request_date ?? "",
        adoptionRequest.notes ?? "",
        adoptionRequest.status === "" ? "Available" : "Unavailable",
    ])
}