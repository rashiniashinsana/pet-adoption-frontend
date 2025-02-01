export class Adoption_RequestModel {
    adopter_id: string;
    pet_id: string;
    request_date: string;
    notes: string;
    status: string;

    constructor(adopter_id:string, pet_id:string, request_date:string, notes:string, status:string) {
        this.adopter_id = adopter_id;
        this.pet_id = pet_id;
        this.request_date = request_date;
        this.notes = notes;
        this.status = status;
    }
}