import { toast } from "react-toastify";

const validateAdopter = (
    name: string,
    email: string,
    phone: string,
    address: string
) => {
    const alphaRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email pattern
    const phoneRegex = /^[0-9]{10}$/; // Allows exactly 10 digits for phone numbers
    const alphaNumericRegex = /^[a-zA-Z0-9\s,.-]+$/; // Allows letters, numbers, spaces, commas, dots, and dashes for address

    function validateField(field: string, fieldName: string, regex: RegExp) {
        if (!field || field.trim() === "") {
            toast.error(`${fieldName} is required.`);
            return false;
        } else if (!regex.test(field)) {
            toast.error(`${fieldName} must be valid.`);
            return false;
        } else if (fieldName === "Name" && field[0] !== field[0].toUpperCase()) {
            toast.error(`${fieldName} must start with a capital letter.`);
            return false;
        }
        return true;
    }

    if (!validateField(name, "Name", alphaRegex)) return false;

    if (!email || !emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return false;
    }

    if (!phone || !phoneRegex.test(phone)) {
        toast.error("Phone number must be a 10-digit number.");
        return false;
    }

    if (!validateField(address, "Address", alphaNumericRegex)) return false;

    return true;
};

export default validateAdopter;
