"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import { uploadFile } from "./upload.actions";
import { getCookie } from "./cookies.actions";
import { ROLES } from "@/constants";
import Specification from "@/models/specification.model";
import { IAddSpecParams } from "@/types/specificaion/specification.types";
import Product from "@/models/product.model";
import Category from "@/models/category.model";
import Brand from "@/models/brand.model";
import { IProductType } from "@/types/product/product.types";
import { ICategoryType } from "@/types/category/category.types";
import { IBrandType } from "@/types/brand/brand.types";

export const getSpecs = async () => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        return parseStringify(await Specification.find().populate(["category", "brand", "product"]))
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const deleteSpecById = async (specId: string) => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        await Specification.findByIdAndDelete(specId)

        return parseStringify({message: "مشخصه با موفقیت حذف شد"})
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const getSpecById = async (specId: string) => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        return parseStringify(await Specification.findById(specId).populate(["category", "brand", "product"]))
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const addSpec = async (values: IAddSpecParams) => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        let query: {
            product?: IProductType,
            category?: ICategoryType,
            brand?: IBrandType,
        } = {}

        if (values?.product) {
            query.product = values.product
        } else if (values?.category) {
            query.category = values.category
        } else {
            query.brand = values.brand
        }

        const existSpec = await Specification.findOne(query)
        if (existSpec) {
            await Specification.updateOne({_id: existSpec._id}, {$push: {specifications: values.specifications}})
        } else {
            const specDoc = await Specification.create(values)
    
            if (values?.product) {
                await Product.findByIdAndUpdate(values.product, { specs: specDoc._id })
            } else if (values?.category) {
                await Category.findByIdAndUpdate(values.category, { specs: specDoc._id })
            } else {
                await Brand.findByIdAndUpdate(values.brand, { specs: specDoc._id })
            }
        }

        return parseStringify({ message: "مشخصات با موفقیت ایجاد شد" })
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const editSpecById = async (values: IAddSpecParams, specId: string) => {
    try {
        const user = await getCookie("user")
        if (user?.role !== ROLES.ADMIN.name)
            return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

        await connectMongo()

        await Specification.findByIdAndUpdate(specId, values)
        return parseStringify({ message: "مشخصات با موفقیت ویرایش شد" })
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}