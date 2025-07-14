import Cookies from "js-cookie";

export const setOrderCookies = (order: any) => {
    Cookies.set("order", JSON.stringify(order), {
        expires: 1, // Set the cookie to expire in 1 day
        secure: true, // Use secure cookies if your site is served over HTTPS
        sameSite: "Strict", // Use strict SameSite attribute for better security
    });
};

export const getOrderCookies = () => {
    const order = Cookies.get("order");
    return order ? JSON.parse(order) : null;
};

export const removeOrderCookies = () => {
    Cookies.remove("order");
};
