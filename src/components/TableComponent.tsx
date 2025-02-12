import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { dataRefactor } from "../util/dataRefactor.ts";

interface TableProps {
    headersData: string[];
    bodyData: string[][];
    updatePopupAction?: (id: string) => void;
    deletePopupAction?: (id: string) => void;
    viewPopupAction?: (id: string) => void;
}

const Table = ({
                   headersData,
                   bodyData,
                   updatePopupAction,
                   deletePopupAction,
                   viewPopupAction,
               }: TableProps) => {
    return (
        <div className=" mt-5 w-full overflow-x-auto">
            {/* Table Wrapper */}
            <div className="border border-gray-200 rounded-lg w-full"> {/* Removed shadow-md class */}

                {/* Table Header */}
                <div className="bg-sky-300 text-white font-semibold py-3 px-4 rounded-xl grid grid-cols-6 text-center sticky top-0 z-10 mb-2">
                    {headersData.map((header, index) => (
                        <div key={index} className="p-2 truncate">
                            <span>{header}</span>
                        </div>
                    ))}
                    <div className="p-2">Actions</div>
                </div>

                {/* Table Body - Expands until 10 rows, then scrolls */}
                <div className={`bg-gray-50 overflow-y-auto ${bodyData.length > 10 ? "max-h-[550px]" : "min-h-[calc(100vh-200px)]"}`}>
                    {bodyData.length > 0 ? (
                        bodyData.map((data, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid grid-cols-6 text-center bg-gray-100 font-sans text-sm hover:bg-sky-50 p-3 cursor-pointer transition-all border-b last:border-none mb-2 rounded-xl"  // Added mb-2 for gap
                            >
                                {data.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="p-2 truncate">
                                        {dataRefactor(cell, 15)}
                                    </div>
                                ))}

                                {/* Actions */}
                                <div className="flex justify-center gap-4">
                                    <EyeIcon
                                        onClick={() => viewPopupAction?.(data[0])}
                                        className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer"
                                    />
                                    <PencilIcon
                                        onClick={() => updatePopupAction?.(data[0])}
                                        className="h-5 w-5 text-gray-500 hover:text-green-400 cursor-pointer"
                                    />
                                    <TrashIcon
                                        onClick={() => deletePopupAction?.(data[0])}
                                        className="h-5 w-5 text-gray-500 hover:text-red-400 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-5 text-gray-500 text-center">No data available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;
