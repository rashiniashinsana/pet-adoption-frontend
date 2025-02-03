import {AdoptionRequest} from "../../model/AdoptionRequest.ts";
import {toast} from "react-toastify";


const adoptionRequestValidation = (adoptionRequest : AdoptionRequest) => {
    if (!adoptionRequest.request_date) {
        toast.error("Request Date is required");
        return false;
    }
    if (!adoptionRequest.notes) {
        toast.error("Note is required");
        return false;
    }
    if (!adoptionRequest.status) {
        toast.error("Status is required");
        return false;
    }
    return true
}

export default adoptionRequestValidation;