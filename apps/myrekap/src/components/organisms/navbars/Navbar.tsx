import { getUserCookies } from "@/utils";
import { memo } from "react";
import { NavbarLogo, NavbarUserMenu } from ".";

const Navbar = memo(function () {
    const { username, role } = getUserCookies();

    return (
        <nav className="p-3 px-10 w-full flex justify-between bg-white items-center">
            <NavbarLogo />
            <NavbarUserMenu username={username} role={role} />
        </nav>
    );
});

export default Navbar;
