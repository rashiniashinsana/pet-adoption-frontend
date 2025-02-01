export class PetModel {
    pet_id: string;
    name: string;
    age: number;
    breed: string;
    type: string;
    health_status: string;
    image: File | null;

    constructor(pet_id:string , name:string, age:number, breed:string, type:string, health_status:string, image:File | null = null ) {
        this.pet_id = pet_id;
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.type = type;
        this.health_status = health_status;
        this.image = image;
    }
}