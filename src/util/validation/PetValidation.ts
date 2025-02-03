import { toast } from "react-toastify";

const validatePet = (
    name: string,
    age: number,
    breed: string,
    type: string,
    health_status: string,
    image: File | null
) => {
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;

    function validateField(field: string, fieldName: string, regex: RegExp) {
        if (!field || field.trim() === "") {
            toast.error(`${fieldName} is required.`);
            return false;
        } else if (!regex.test(field)) {
            toast.error(`${fieldName} must be valid.`);
            return false;
        } else if (field[0] !== field[0].toUpperCase()) {
            toast.error(`${fieldName} must start with a capital letter.`);
            return false;
        }
        return true;
    }

    if (!validateField(name, "Pet name", alphaRegex)) return false;
    if (!validateField(breed, "Breed", alphaRegex)) return false;
    if (!validateField(type, "Type", alphaRegex)) return false;
    if (!validateField(health_status, "Health status", alphaNumericRegex)) return false;

    if (!age || isNaN(age) || age <= 0) {
        toast.error("Age must be a valid positive number.");
        return false;
    }

    if (!image) {
        toast.error("Pet image is required.");
        return false;
    }

    return true;
};

export default validatePet;
