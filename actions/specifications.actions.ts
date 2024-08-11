"use server"

import connectMongo from "@/lib/connectMongo";
import { parseStringify } from "@/lib/utils";
import { uploadFile } from "./upload.actions";
import { getCookie } from "./cookies.actions";
import { ROLES } from "@/constants";
import Specification from "@/models/specification.model";

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

// export const getProductById = async (productId: string) => {
//     try {
//         const user = await getCookie("user")
//         if (user?.role !== ROLES.ADMIN.name)
//             return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

//         await connectMongo()

//         return parseStringify(await Product.findById(productId).populate(["category", "brand", "specs", "features"]))
//     } catch (error: unknown) {
//         console.log(error);

//         if (error instanceof Error) {
//             return parseStringify({ error: error.message });
//         } else {
//             return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
//         }
//     }
// }

// export const addProduct = async (values: IAddProductParams) => {
//     try {
//         const user = await getCookie("user")
//         if (user?.role !== ROLES.ADMIN.name)
//             return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

//         await connectMongo()

//         let images: string[] = []

//         if (values.images) {
//             const imgs = [...values.images]

//             for(const img of imgs) {
//                 let fd = new FormData();
//                 fd.append("file", img[1])
//                 images.push(await uploadFile(fd, "products"))
//             }

//             values.images = images
//         }

//         await Product.create(values)

//         return parseStringify({ message: "محصول با موفقیت ایجاد شد" })
//     } catch (error: unknown) {
//         console.log(error);

//         if (error instanceof Error) {
//             return parseStringify({ error: error.message });
//         } else {
//             return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
//         }
//     }
// }

// export const editProduct = async (values: IAddProductParams, productId: string) => {
//     try {
//         const user = await getCookie("user")
//         if (user?.role !== ROLES.ADMIN.name)
//             return parseStringify({ error: "شما دسترسی به این بخش را ندارید" });

//         await connectMongo()

//         let images: string[] = []

//         if (values.images) {
//             const imgs = [...values.images]

//             for(const img of imgs) {
//                 let fd = new FormData();
//                 fd.append("file", img[1])
//                 images.push(await uploadFile(fd, "products"))
//             }

//             values.images = images
//         }

//         await Product.findByIdAndUpdate(productId, values)

//         return parseStringify({ message: "محصول با موفقیت ویرایش شد" })
//     } catch (error: unknown) {
//         console.log(error);

//         if (error instanceof Error) {
//             return parseStringify({ error: error.message });
//         } else {
//             return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
//         }
//     }
// }