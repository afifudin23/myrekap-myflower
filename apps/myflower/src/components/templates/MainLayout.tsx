import Navbar from "@/components/organisms/layouts/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

function MainLayout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="mx-auto mt-32 w-10/12 px-10 overflow-auto">{children}</main>
        </div>
    );
}
export default MainLayout;
