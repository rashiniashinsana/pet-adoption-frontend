import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/RootLayout.tsx";
// import {Dashboard} from "./pages/Dashboard.tsx";
import AdopterPage from "./pages/AdopterPage.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import PetPage from "./pages/PetPage.tsx";
import AdoptionRequestPage from "./pages/AdoptionRequestPage.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                // { path: "", element: <Dashboard /> },
                { path: "/adopter", element: <AdopterPage /> },
                { path: "/pet", element: <PetPage /> },
                { path: "/adoption-request", element: <AdoptionRequestPage /> }
            ],
        },
        {
            path: "*",
            element: <NotFoundPage />,
        }
    ])

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routes} />
            </Provider>
        </>
    )
}

export default App
