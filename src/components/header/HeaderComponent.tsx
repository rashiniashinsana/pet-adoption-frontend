interface HeaderComponentProps {
    section?: string;
    button?: string;
    addPopupAction?: () => void;
    searchAction: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderComponent = ({ section, button, addPopupAction, searchAction }: HeaderComponentProps) => {
    return (
        <header className="flex justify-between items-center bg-white px-6 py-4  ">
            <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500">
                {section}
            </h2>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    className="px-3 py-2 border rounded-lg outline-none text-gray-700 placeholder-gray-400"
                    placeholder="Search..."
                    onChange={(e) => searchAction(e.target.value)}
                />
                {button && (
                    <button
                        className="bg-indigo-500  hover:bg-indigo-300  px-4 py-2 rounded-md text-white"
                        onClick={addPopupAction}
                    >
                        {button}
                    </button>
                )}
            </div>
        </header>
    );
};

export default HeaderComponent;
