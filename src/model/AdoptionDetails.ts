export default class AdoptionDetails {
    adoptionId: string;
    pet: string;
    quantity: number;
    adoptionFee: number;
    total: number;

    constructor(adoptionId: string, pet: string, quantity: number, adoptionFee: number, total: number) {
        this.adoptionId = adoptionId;
        this.pet = pet;
        this.quantity = quantity;
        this.adoptionFee = adoptionFee;
        this.total = total;
    }
}