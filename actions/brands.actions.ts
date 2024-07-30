"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import { uploadFile } from "./upload.actions";
import { getCookie } from "./cookies.actions";
import { ROLES } from "@/constants";
import Brand from "@/models/brand.model";
import { IAddBrandParams } from "@/types/brand/brand.types";

export const getBrands = async () => {
    try {
        await connectMongo()

        return parseStringify(await Brand.find())
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const addBrand = async (values: IAddBrandParams) => {
    try {
        const user = await getCookie("user")
        if(user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        if(values.image) {
            values.image = await uploadFile(values.image, "brands")
        }

        await Brand.create(values)
        
        return parseStringify({message: "برند با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const deleteBrand = async (brandId: string) => {
    try {
        const user = await getCookie("user")
        if(user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        
        await connectMongo()

        await Brand.findByIdAndDelete(brandId)
        
        return parseStringify({message: "برند با موفقیت حذف شد"})
        
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}