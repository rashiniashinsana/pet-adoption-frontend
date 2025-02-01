import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store.ts";
import { PetModel } from "../model/PetModel.ts";
import { useEffect, useState } from "react";
import { deletePet, savePet, updatePet, getAllPets } from "../slice/PetSlice.ts";
import { TrashIcon } from "@heroicons/react/24/outline";

function PetPage() {
    const dispatch = useDispatch<AppDispatch>();
    const pets: PetModel[] = useSelector((state: { pet: PetModel[] }) => state.pet);

    const [pet_id, setPetId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [breed, setBreed] = useState("");
    const [type, setType] = useState("");
    const [health_status, setHealthStatus] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getAllPets());
        setPetId(pets.length > 0 ? (parseInt(pets[pets.length - 1].pet_id) + 1).toString() : "1");
    }, [dispatch, pets]);

    const handleAdd = () => {
        if (!name || !age || !breed || !type || !health_status) {
            alert("All fields are required!");
            return;
        }

        const newPet = new PetModel(pet_id, name, Number(age), breed, type, health_status, image);
        dispatch(savePet(newPet));
        resetForm();
    };

    const handleUpdate = () => {
        if (!name || !age || !breed || !type || !health_status) {
            alert("All fields are required!");
            return;
        }

        const updatedPet = new PetModel(pet_id, name, Number(age), breed, type, health_status, image);
        dispatch(updatePet(updatedPet));
        resetForm();
        setIsEditing(false);
    };

    const handleDelete = (pet_id: string) => {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            dispatch(deletePet(pet_id));
        }
    };

    const handleEdit = (pet: PetModel) => {
        setPetId(pet.pet_id);
        setName(pet.name);
        setAge(pet.age);
        setBreed(pet.breed);
        setType(pet.type);
        setHealthStatus(pet.health_status);
        setImage(pet.image);
        setIsEditing(true);
    };

    const resetForm = () => {
        setPetId("1");
        setName("");
        setAge("");
        setBreed("");
        setType("");
        setHealthStatus("");
        setImage(null);
        setIsEditing(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pet Management</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="pet_id" placeholder="ID" readOnly value={pet_id} className="border p-2 rounded" />
                <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
                <input type="number" name="age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} className="border p-2 rounded" />
                <input type="text" name="breed" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} className="border p-2 rounded" />
                <input type="text" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded" />
                <input type="text" name="health_status" placeholder="Health Status" value={health_status} onChange={(e) => setHealthStatus(e.target.value)} className="border p-2 rounded" />
                <input type="file" name="image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} className="border p-2 rounded" />
            </div>
            <div className="flex justify-end">
                {isEditing ? (
                    <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
                ) : (
                    <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded mr-2">Add</button>
                )}
                {isEditing && (
                    <button onClick={resetForm} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
                )}
            </div>
            <table className="min-w-full table-auto border-collapse mt-6">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Age</th>
                    <th className="border px-4 py-2">Breed</th>
                    <th className="border px-4 py-2">Type</th>
                    <th className="border px-4 py-2">Health Status</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {pets.map((pet) => (
                    <tr key={pet.pet_id} onClick={() => handleEdit(pet)} className="hover:cursor-pointer hover:bg-slate-600 hover:text-white">
                        <td className="border px-4 py-2">{pet.pet_id}</td>
                        <td className="border px-4 py-2">{pet.name}</td>
                        <td className="border px-4 py-2">{pet.age}</td>
                        <td className="border px-4 py-2">{pet.breed}</td>
                        <td className="border px-4 py-2">{pet.type}</td>
                        <td className="border px-4 py-2">{pet.health_status}</td>
                        <td className="border px-4 py-2 text-center">
                            {pet.image && (
                                <img src={URL.createObjectURL(pet.image)} alt={pet.name} className="w-16 h-16 rounded-full mx-auto" />
                            )}
                        </td>
                        <td className="border px-4 py-2 text-center">
                            <button onClick={() => handleDelete(pet.pet_id)} className="bg-red-500 text-white p-2 rounded-lg">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PetPage;
