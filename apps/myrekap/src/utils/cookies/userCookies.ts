import Cookies from "js-cookie";

export const setUserCookies = (user: { username: string; role: string }) => {
    Cookies.set("user", JSON.stringify(user), {
        expires: 1, // Set the cookie to expire in 1 day
        secure: true, // Use secure cookies if your site is served over HTTPS
        sameSite: "Strict", // Use strict SameSite attribute for better security
    });
};

export const getUserCookies = () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
};
export const removeUserCookies = () => {
    Cookies.remove("user");
};