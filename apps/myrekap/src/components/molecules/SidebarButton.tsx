import { SidebarButtonProps } from "@/types/Sidebar";
import { getUserCookies } from "@/utils/userCookies";
import { NavLink } from "react-router-dom";

export function SidebarButton({ name, path, icons }: SidebarButtonProps) {
    const user = getUserCookies();

    return (
        <>
            {path === "administrator" && user.role === "ADMIN" ? (
                <p className="flex gap-3 w-fit items-center text-gray-400">
                    {icons.inactive}
                    <button className={`cursor-not-allowed`}>{name}</button>
                </p>
            ) : (
                <NavLink to={`/${path}`} className={`flex gap-3 w-fit items-center p-1 group`}>
                    {({ isActive }) => (
                        <>
                            <span
                                className={`transition duration-150 ease-in-out opacity-100 ${
                                    isActive ? "group-hover:opacity-100" : "group-hover:opacity-0"
                                }`}
                            >
                                {isActive ? icons.active : icons.inactive}
                            </span>
                            <span
                                className={`absolute transition duration-150 ease-in-out opacity-0 group-hover:opacity-100`}
                            >
                                {icons.active}
                            </span>
                            {name}
                        </>
                    )}
                </NavLink>
            )}
        </>
    );
}
