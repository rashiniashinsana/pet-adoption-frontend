import { toast } from "react-toastify";
import {Adopter} from "../../model/Adopter.ts";

const validateAdopter = (adopters: Adopter): boolean => {
    const {
        name,
        email,
        phone,
        address
    } = adopters;

    const alphaRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email pattern
    const phoneRegex = /^[0-9]{10}$/; // Allows exactly 10 digits for phone numbers
    const alphaNumericRegex = /^[a-zA-Z0-9\s,.-]+$/; // Allows letters, numbers, spaces, commas, dots, and dashes for address

    // Name: Required, only letters and spaces, and must start with a capital letter
    if (!name?.trim() || !alphaRegex.test(name.trim())) {
        toast.error("Name must contain only letters and spaces.");
        return false;
    }
    if (name[0] !== name[0].toUpperCase()) {
        toast.error("Name must start with a capital letter.");
        return false;
    }

    // Email: Valid email format
    if (!email?.trim() || !emailRegex.test(email.trim())) {
        toast.error("A valid email address is required.");
        return false;
    }

    // Phone: Required and must be 10 digits
    if (!phone?.trim() || !phoneRegex.test(phone)) {
        toast.error("Phone number must be a 10-digit number.");
        return false;
    }

    // Address: Address should contain alphanumeric characters, spaces, commas, dots, and dashes
    if (!address?.trim() || !alphaNumericRegex.test(address.trim())) {
        toast.error("Address must contain only valid characters (letters, numbers, spaces, commas, dots, dashes).");
        return false;
    }

    // If all validations pass
    return true;
};

export default validateAdopter;
