import Footer from "@/components/organisms/layouts/Footer";
import Navbar from "@/components/organisms/layouts/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
    className?: string;
};

function MainLayout({ children, className = "w-10/12" }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className={`mx-auto mt-32 flex-grow px-10 mb-80 ${className}`}>{children}</main>
            <Footer />
        </div>
    );
}
export default MainLayout;
