export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-6 text-4xl text-red-800 border border-orange-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-red-700 dark:border-yellow-800" role="alert">
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Page Not Found </span>
                </div>
            </div>
            <div className="mt-6">
                <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                    Go Back to Home
                </a>
            </div>
        </div>
    );
};
