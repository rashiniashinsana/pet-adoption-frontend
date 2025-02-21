import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "./Menu.tsx";

export function RootLayout() {
    const location = useLocation();
    const hideMenuPaths = ["/", "/signup"];
    const shouldHideMenu = hideMenuPaths.includes(location.pathname);

    return (
        <div className="flex h-screen">
            {!shouldHideMenu && (
                <header>
                    <Menu />
                </header>
            )}
            <main className="p-6 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
