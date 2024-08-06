export const ROLES: { [key: string]: any } = Object.freeze({
    USER: {
        name: "USER",
        persian: "کاربر"
    },
    ADMIN: {
        name: "ADMIN",
        persian: "ادمین"
    },
    DRIVER: {
        name: "DRIVER",
        persian: "راننده"
    },
    STORE_OWNER: {
        name: "STORE_OWNER",
        persian: "فروشگاه دار"
    },
})

export const CategoryDefaultValues = {
    name: "",
    image: [],
    parent: ""
}

export const BrandDefaultValues = {
    name: "",
    image: [],
}

export const ChooseRoleDefaultValues = {
    avatar: [],
    firstname: "",
    lastname: "",
}

export const StoreInfoDefaultValues = {
    name: "",
    province: "",
    city: "",
    address: "",
}

export const ProductDefaultValues = {
    name: "",
    images: [],
    brand: "",
    category: "",
    slug: "",
    description: '<h1>در این قسمت میتوانید به صورت کامل توضیحات همراه با تصاویر برای محصول قرار دهید.</h1>',
    visible: true,
}