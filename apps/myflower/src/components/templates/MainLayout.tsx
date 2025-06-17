import Navbar from "@/components/organisms/layouts/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
    className?: string;
};

function MainLayout({ children, className }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col pb-96">
            <Navbar />
            <main className={`mx-auto mt-32 w-10/12 px-10 overflow-auto ${className}`}>{children}</main>
        </div>
    );
}
export default MainLayout;
