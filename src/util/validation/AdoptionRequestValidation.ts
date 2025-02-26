import { toast } from "react-toastify";

const allowedStatuses = ["Pending", "Approved", "Rejected"];
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

const adoptionRequestValidation = (
    adopter_id: string,
    pet_id: string,
    request_date: string,
    notes: string,
    status: string
) => {
    // Validate adopter_id
    if (!adopter_id || adopter_id.trim().length === 0) {
        toast.error("Adopter ID is required");
        return false;
    }

    // Validate pet_id
    if (!pet_id || pet_id.trim().length === 0) {
        toast.error("Pet ID is required");
        return false;
    }

    // Validate request_date with regex
    if (!request_date) {
        toast.error("Request Date is required");
        return false;
    }

    if (!dateRegex.test(request_date)) {
        toast.error("Invalid Request Date (must be in YYYY-MM-DD format)");
        return false;
    }

    const requestDate = new Date(request_date);
    if (isNaN(requestDate.getTime())) {
        toast.error("Invalid Request Date");
        return false;
    }

    // Validate notes
    if (!notes || notes.trim().length === 0) {
        toast.error("Note is required");
        return false;
    }

    // Validate status
    if (!status) {
        toast.error("Status is required");
        return false;
    }

    if (!allowedStatuses.includes(status)) {
        toast.error("Invalid status. Allowed values: Pending, Approved, or Rejected.");
        return false;
    }

    return true;
};

export default adoptionRequestValidation;
