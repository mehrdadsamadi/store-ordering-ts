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
    // location: {
    //     lat: 35.715298,
    //     lng: 51.404343
    // }
}