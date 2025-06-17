import Navbar from "@/components/organisms/layouts/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
    className?: string;
};

function MainLayout({ children, className = "w-10/12" }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col pb-16">
            <Navbar />
            <main className={`mx-auto mt-32 px-10 overflow-auto pb-10 ${className}`}>{children}</main>
        </div>
    );
}
export default MainLayout;
