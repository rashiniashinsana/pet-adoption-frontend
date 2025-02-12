import { toast } from "react-toastify";

const allowedStatuses = ["Pending", "Approved", "Rejected"];

const adoptionRequestValidation = (adopter_id: string, pet_id: string, request_date: string, notes: string, status: string) => {
    // Check if request_date is provided
    if (!request_date) {
        toast.error("Request Date is required");
        return false;
    }

    // Validate the date format
    const requestDate = new Date(request_date);
    if (isNaN(requestDate.getTime())) {
        toast.error("Invalid Request Date");
        return false;
    }

    // Check if notes is provided and is not empty
    if (!notes || notes.trim().length === 0) {
        toast.error("Note is required");
        return false;
    }

    // Check if status is provided
    if (!status) {
        toast.error("Status is required");
        return false;
    }

    // Check if the status is valid
    if (!allowedStatuses.includes(status)) {
        toast.error("Invalid status. Allowed values: Pending, Approved, or Rejected.");
        return false;
    }

    return true;
}

export default adoptionRequestValidation;
