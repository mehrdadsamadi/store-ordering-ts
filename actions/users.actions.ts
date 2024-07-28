"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { ISaveUserBaseInfoParams } from "@/types/user/user.types";
import { setCookie } from "./cookies.actions";
import { uploadFile } from "./upload.actions";

export const saveUserBaseInfo = async (values: ISaveUserBaseInfoParams) => {
    try {
        await connectMongo()

        let { phone, firstname, lastname, role, avatar } = values

        if(avatar) {
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