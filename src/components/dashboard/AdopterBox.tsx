import { useSelector } from "react-redux";
import { RootState } from "../../store/store.tsx";
import {TbBrandOpenSourceFilled} from "react-icons/tb";

function AdopterBox() {
    const adopters = useSelector((state: RootState) => state.adopter);
    const requests = useSelector((state: RootState) => state.request);

    // Filter adopters who have at least 3 adoption requests, and at least 3 of them are approved
    const topAdopters = adopters?.filter((adopter) => {
        const adopterRequests = requests?.filter((request) => request.adopter_id === adopter.adopter_id) || [];
        const approvedRequests = adopterRequests.filter((request) => request.status.toLowerCase() === "approved");
        return adopterRequests.length >= 3 && approvedRequests.length >= 3;
    }) || [];

    const totalApprovedRequests = requests ? requests.filter((request) => request.status.toLowerCase() === "approved").length : 0;

    const stats = [
        { title: 'Top Adopters', value: topAdopters.length, icon: TbBrandOpenSourceFilled, color: 'bg-blue-100' },
        { title: 'Approved Requests', value: totalApprovedRequests, icon: TbBrandOpenSourceFilled, color: 'bg-green-100' }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 h-full w-full">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Adopters</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center p-5 bg-white shadow-md rounded-lg">
                            <stat.icon className={`h-10 w-10 text-white p-2 rounded-full ${stat.color} mr-4`} />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
                                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table for Top Adopters */}
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Adopter ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Approved Adoptions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {topAdopters.length > 0 ? (
                            topAdopters.map((adopter) => {
                                const approvedRequests = requests?.filter(
                                    (request) => request.pet_id === adopter.adopter_id && request.status.toLowerCase() === "approved"
                                ).length || 0;

                                return (
                                    <tr key={adopter.adopter_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{adopter.adopter_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{adopter.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approvedRequests}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                    No top adopters yet.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdopterBox;
