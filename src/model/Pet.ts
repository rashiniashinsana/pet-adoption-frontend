export class Pet {
    pet_id: string;
    name: string;
    age: string;
    breed: string;
    gender: string;
    health_status: string;
    image: File | null;

    constructor(pet_id:string , name:string, age:string, breed:string, gender:string, health_status:string, image:File | null = null ) {
        this.pet_id = pet_id;
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.gender = gender;
        this.health_status = health_status;
        this.image = image;
    }
}