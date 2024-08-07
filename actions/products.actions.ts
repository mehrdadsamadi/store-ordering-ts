"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import { uploadFile } from "./upload.actions";
import { getCookie } from "./cookies.actions";
import { ROLES } from "@/constants";
import Product from "@/models/product.model";
import { IAddProductParams } from "@/types/product/product.types";

export const getProducts = async () => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        return parseStringify(await Product.find().populate(["category", "brand", "specs", "features"]))
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const addProduct = async (values: IAddProductParams) => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        let images: string[] = []

        if (values.images) {
            const imgs = [...values.images]

            for(const img of imgs) {
                let fd = new FormData();
                fd.append("file", img[1])
                images.push(await uploadFile(fd, "products"))
            }

            values.images = images
        }

        await Product.create(values)

        return parseStringify({ message: "محصول با موفقیت ایجاد شد" })
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}