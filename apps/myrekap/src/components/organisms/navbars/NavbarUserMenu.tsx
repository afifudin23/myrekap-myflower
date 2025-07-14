interface NavbarUserMenuProps {
    username: string;
    role: string;
}

function NavbarUserMenu({ username, role }: NavbarUserMenuProps) {
    return (
        <div className=" flex gap-1 items-center cursor-default">
            <div className="flex flex-col items-center">
                <div className="text-lg font-nunito leading-none">{username}</div>
                <div
                    className={`text-sm relative font-semibold capitalize tracking-wide px-3 rounded-lg bg-opacity-40 ${
                        role === "ADMIN" ? "text-blue-600 bg-blue-300" : "text-yellow-700 bg-yellow-400"
                    }`}
                >
                    {role}
                </div>
            </div>
            <img src="/assets/images/profile.jpg" alt="Profile" className="w-14 h-14 rounded-full" />
        </div>
    );
}

export default NavbarUserMenu;
