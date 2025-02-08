import { HomeIcon, ChartBarIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

            <div className="flex items-center p-5 bg-white shadow-md rounded-lg">
                <Squares2X2Icon className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Your Balance</h2>
                    <p className="text-xl font-bold text-gray-900">$1,000</p>
                </div>
            </div>

            <div className="flex items-center p-5 bg-white shadow-md rounded-lg">
                <ChartBarIcon className="h-10 w-10 text-green-500 mr-4" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">New Tasks</h2>
                    <p className="text-xl font-bold text-gray-900">145</p>
                </div>
            </div>


            <div className="flex items-center p-5 bg-white shadow-md rounded-lg">
                <HomeIcon className="h-10 w-10 text-red-500 mr-4" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Total Projects</h2>
                    <p className="text-xl font-bold text-gray-900">$2433</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
