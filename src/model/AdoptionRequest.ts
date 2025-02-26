export class AdoptionRequest {
    request_id: string;
    adopter_id: string;
    pet_id: string;
    request_date: string;
    notes: string;
    status: string;

    constructor(request_id:string,adopter_id:string, pet_id:string, request_date:string, notes:string, status:string) {
        this.request_id = request_id;
        this.adopter_id = adopter_id;
        this.pet_id = pet_id;
        this.request_date = request_date;
        this.notes = notes;
        this.status = status;
    }
}