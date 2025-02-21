import {InboxArrowDownIcon} from "@heroicons/react/24/solid";
import PieChart from "../components/dashboard/PieChart.tsx"
import {useSelector} from "react-redux";
import { MdPets} from "react-icons/md";
import {RootState} from "../store/store.tsx";
import {BsPerson} from "react-icons/bs";
import AdopterBox from "../components/dashboard/AdopterBox.tsx";
import {GiConfirmed} from "react-icons/gi";
import HeaderBox from "../components/dashboard/HeaderBox.tsx";

function Dashboard() {

    const adopters = useSelector((state:RootState) => state.adopter);
    const pets = useSelector((state:RootState) => state.pet);
    const requests = useSelector((state:RootState) => state.request);

    const totalAdopters = adopters ? adopters.length : 0;
    const totalPets = pets ? pets.length : 0;
    const totalRequests = requests ? requests.length : 0;
    const totalApprovedRequests = requests ? requests.filter((request) => request.status.toLowerCase() === "approved").length : 0;

    const stats = [
        { title: 'Total Adopters', value: totalAdopters, icon:BsPerson, color: 'bg-green-400' },
        { title: 'Total Pets', value: totalPets, icon: MdPets, color: 'bg-sky-400' },
        { title: 'Total Requests', value: totalRequests, icon: InboxArrowDownIcon, color: 'bg-purple-400' },
        { title: 'Approved Request', value: totalApprovedRequests, icon: GiConfirmed, color: 'bg-red-400' },
    ];

    return (
        <>
            <h2 className="text-4xl font-semibold text-gray-700 mb-10"><HeaderBox/></h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center p-5 bg-white shadow-md rounded-lg">
                        <stat.icon className={`h-10 w-10 text-white p-2 rounded-full ${stat.color} mr-4`}/>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6 col-span-3">
                <div
                    className="  bg-white shadow-md rounded-lg w-50 h-70 flex items-center justify-center  max-2xl:">
                    <PieChart/>
                </div>
                <div
                    className="bg-white shadow-md rounded-lg w-50 h-70 flex items-center justify-center  max-2xl: ">
                    <AdopterBox/>
                </div>
            </div>


        </>
    );
}

export default Dashboard;
