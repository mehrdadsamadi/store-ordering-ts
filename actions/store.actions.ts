"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import { getCookie } from "./cookies.actions";
import { IStoreInfo } from "@/types/store/store.types";
import Store from "@/models/store.model";

export const handleStoreInfo = async ({values, edit = false}: {values: IStoreInfo, edit?: boolean}) => {
    try {
        const user = await getCookie("user")
        if(!user)
            return parseStringify({ error: 'ابتدا در حساب کاربری خود لاگین کنید' });

        await connectMongo()

        if(!edit) {
            await Store.create({...values, ownerId: user._id})
            return parseStringify({message: "اطلاعات شما با موفقیت ثبت شد"})
        } else {
            await Store.findOneAndUpdate({ phone: values.phone }, values)
            return parseStringify({message: "اطلاعات شما با موفقیت ویرایش شد"})
        }
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}