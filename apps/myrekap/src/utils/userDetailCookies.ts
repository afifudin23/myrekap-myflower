import { UserType } from "@/types/Data";
import Cookies from "js-cookie";

export const setUserDetailCookies = (user: UserType) => {
    Cookies.set("userDetail", JSON.stringify(user), {
        expires: 1, // Set the cookie to expire in 1 day
        secure: true, // Use secure cookies if your site is served over HTTPS
        sameSite: "Strict", // Use strict SameSite attribute for better security
    });
};
export const getUserDetailCookies = () => {
    const user = Cookies.get("userDetail");
    return user ? JSON.parse(user) : null;
};

export const removeUserDetailCookies = () => {
    Cookies.remove("userDetail");
};
