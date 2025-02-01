import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store.ts";
import { AdopterModel } from "../model/AdopterModel.ts";
import { useEffect, useState } from "react";
import { deleteAdopter, saveAdopter, updateAdopter, getAllAdopters } from "../slice/AdopterSlice.ts";
import { TrashIcon } from "@heroicons/react/24/outline";

function Adopter() {
    const dispatch = useDispatch<AppDispatch>();
    const adopters: AdopterModel[] = useSelector((state: { adopter: AdopterModel[] }) => state.adopter);
    const [adopter_id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getAllAdopters());
        setId(adopters.length > 0 ? (parseInt(adopters[adopters.length - 1].adopter_id) + 1).toString() : "1");
    }, [dispatch, adopters]);

    const handleAdd = () => {
        if (!name || !email || !phone  || !address) {
            alert("All fields are required!");
            return;
        }
        const newAdopter = new AdopterModel(adopter_id, name, email, phone, address);
        dispatch(saveAdopter(newAdopter));
        resetForm();
    };

    const handleUpdate = () => {
        if (!name || !email || !phone || !address) {
            alert("All fields are required!");
            return;
        }
        const updatedAdopter = new AdopterModel(adopter_id, name, email, phone, address);
        dispatch(updateAdopter(updatedAdopter));
        resetForm();
        setIsEditing(false);
    };

    const handleDelete = (adopter_id: string) => {
        if (window.confirm("Are you sure you want to delete this adopter?")) {
            dispatch(deleteAdopter(adopter_id));
        }
    };

    const handleEdit = (adopter: AdopterModel) => {
        setId(adopter.adopter_id);
        setName(adopter.name);
        setEmail(adopter.email);
        setPhone(adopter.phone);
        setAddress(adopter.address);
        setIsEditing(true);
    };

    const resetForm = () => {
        setId("1");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setIsEditing(false);
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="id" placeholder="ID" readOnly value={adopter_id} className="border p-2 rounded" />
                <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
                <input type="text" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 rounded" />
                <input type="text" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 rounded" />
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
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Address</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {adopters.map((adopter) => (
                    <tr key={adopter.adopter_id} onClick={() => handleEdit(adopter)} className="hover:cursor-pointer hover:bg-slate-600 hover:text-white">
                        <td className="border px-4 py-2">{adopter.adopter_id}</td>
                        <td className="border px-4 py-2">{adopter.name}</td>
                        <td className="border px-4 py-2">{adopter.email}</td>
                        <td className="border px-4 py-2">{adopter.phone}</td>
                        <td className="border px-4 py-2">{adopter.address}</td>
                        <td className="border px-4 py-2 text-center">
                            <button onClick={() => handleDelete(adopter.adopter_id)} className="bg-red-500 text-white p-2 rounded-lg">
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

export default Adopter;
