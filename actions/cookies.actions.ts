"use server";
import { cookies } from "next/headers";

export const setCookie = (data: { [key: string]: any }) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    const prevCookie = cookies().get("user") ? JSON.parse(cookies().get("user")?.value || '{}') : {};

    let cookieObject: { [key: string]: any } = {};

    ['phone', 'first_name', 'last_name', 'role', 'avatar', "_id"].forEach(item => {
        if (data[item]) {
            cookieObject[item] = data[item];
        } else if (prevCookie) {
            cookieObject[item] = prevCookie[item];
        }
    });

    cookies().set('user', JSON.stringify(cookieObject), { expires: new Date(Date.now() + oneWeek) });
}

// export const getCookie = (cookieName: string) => {
//     return JSON.parse(cookies().get(cookieName)?.value || "")
// }
export const getCookie = (cookieName: string) => {
    const cookieValue = cookies().get(cookieName)?.value;
    if (!cookieValue) {
        return null; // یا هر مقدار پیش‌فرض دیگری که مناسب است
    }
    try {
        return JSON.parse(cookieValue);
    } catch (error) {
        console.error('Failed to parse cookie:', error);
        return null; // یا هر مقدار پیش‌فرض دیگری که مناسب است
    }
};