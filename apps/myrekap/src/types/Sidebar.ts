import { ReactNode } from "react";

export type SidebarButtonProps = {
    name: string;
    path: string;
    icons: {
        active: ReactNode;
        inactive: ReactNode;
    };
};