import { Outlet } from "react-router-dom";
import { Menu } from "./Menu.tsx";

export function RootLayout() {
    return (
        <>
            <div className="flex h-screen">
                <header>
                    <Menu/>
                </header>

                    <main className="p-6 flex-1 overflow-y-auto">
                        <Outlet/>
                    </main>
                </div>

        </>

    );
}
