"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import Category from "@/models/category.model";
import { uploadFile } from "./upload.actions";
import { IAddCategoryParams } from "@/types/category/category.types";

export const getCategories = async () => {
    try {
        await connectMongo()

        return parseStringify(await Category.find())
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const getChildCategories = async (parentId: string) => {
    try {
        await connectMongo()

        return parseStringify(await Category.find({parent: parentId}))
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const addCategory = async (values: IAddCategoryParams) => {
    // const {user} = useGetServerSession()
    // if(user?.role !== ROLES.ADMIN.name)
    //     return NextResponse.json({error: "شما دسترسی به این بخش را ندارید"}, {status: 401})

    try {
        await connectMongo()

        if(values.image) {
            values.image = await uploadFile(values.image, "categories")
        }
        
        if(values.parent === "") delete values.parent

        await Category.create(values)
        
        return parseStringify({message: "دسته بندی با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}