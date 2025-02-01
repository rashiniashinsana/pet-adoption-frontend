import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import Adopter from "./pages/Adopter.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "", element: <Dashboard /> },
                { path: "/adopter", element: <Adopter /> }
                // { path: "/pet", element: <Pet /> },
                // { path: "/adoption-request", element: <AdoptionRequest /> }
            ]
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
