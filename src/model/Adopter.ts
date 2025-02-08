export class Adopter {
    adopter_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;

    constructor(adopter_id:string, name:string, email:string , phone:string, address:string) {
    this.adopter_id = adopter_id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;

    }
}