import { z } from "zod";

export const CategoryFormValidation = z.object({
    name: z.string().refine((val) => val.trim() !== '', {
        message: 'نام دسته بندی را وارد کنید',
    }),
    image: z.custom<File[]>().optional(),
    parent: z.string().optional()
});

export const BrandFormValidation = z.object({
    name: z.string().refine((val) => val.trim() !== '', {
        message: 'نام برند را وارد کنید',
    }),
    image: z.custom<File[]>().optional(),
});

export const ChooseRoleFormValidation = z.object({
    firstname: z.string().refine((val) => val.trim() !== '', {
        message: 'نام خود را وارد کنید',
    }),
    lastname: z.string().refine((val) => val.trim() !== '', {
        message: 'نام خانوادگی خود را وارد کنید',
    }),
    avatar: z.custom<File[]>().optional(),
});

export const StoreInfoFormValidation = z.object({
    name: z.string().refine((val) => val.trim() !== '', {
        message: 'نام فروشگاه را وارد کنید',
    }),
    province: z.string().refine((val) => val.trim() !== '', {
        message: 'استان محل فروشگاه را وارد کنید',
    }),
    city: z.string().refine((val) => val.trim() !== '', {
        message: 'شهر محل فروشگاه را وارد کنید',
    }),
    address: z.string().refine((val) => val.trim() !== '', {
        message: 'آدرس فروشگاه را وارد کنید',
    }),
});