import Navbar from "@/components/organisms/Navbar";
import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

function MainLayout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="fixed top-0 left-0 w-full z-20 shadow-md">
                <Navbar />
            </main>

            <div className="flex flex-1 pt-14">
                <aside className="w-52 2xl:w-60 fixed top-[80px] left-0 bottom-0 overflow-auto scrollbar-hide shadow-md bg-white z-40">
                    <Sidebar />
                </aside>
                <main className="flex-1 ml-48 2xl:ml-56 p-16 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
export default MainLayout;
