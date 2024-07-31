"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { ISaveUserBaseInfoParams } from "@/types/user/user.types";
import { getCookie, setCookie } from "./cookies.actions";
import { uploadFile } from "./upload.actions";
import { ROLES } from "@/constants";

export const getUsers = async () => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        return parseStringify(await User.find());

    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const saveUserBaseInfo = async (values: ISaveUserBaseInfoParams) => {
    try {
        await connectMongo()

        let { phone, firstname, lastname, role, avatar } = values

        if (avatar) {
            avatar = await uploadFile(avatar, "users")
        }

        await User.updateOne({ phone }, { firstname, lastname, role, avatar })

        await Session.updateOne({ phone }, { role })

        setCookie({ phone, firstname, lastname, role, avatar })
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}