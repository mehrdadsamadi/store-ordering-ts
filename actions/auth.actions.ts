"use server"

import { ROLES } from "@/constants";
import connectMongo from "@/lib/connectMongo";
import { getRandomFourDigit, parseStringify, sendSms } from "@/lib/utils";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { setCookie } from "./cookies.actions";

export const getOtp = async ({ phone, resend }: { phone: string, resend: boolean }) => {
    try {
        await connectMongo()

        if (resend) {
            await User.deleteOne({ phone })
        }

        const code = getRandomFourDigit()

        const sendedData = {
            "op": "pattern",
            "user": "FREE09371567428",
            "pass": "Faraz@0880337834",
            "fromNum": "+985000125475",
            "toNum": phone,
            "patternCode": "8ggrskeuyy2lkx4",
            "inputData": [
                { "verification-code": code }
            ]
        }

        const saveUserResult = saveUser(phone, code)
        if (!saveUserResult) {
            throw new Error("ورود شما ناموفق بود ، بار دیگر تلاش کنید.")
        }

        await sendSms(sendedData)

        return parseStringify({ message: "کد تایید با موفقیت برای شما ارسال شد." })
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

export const checkOtp = async ({ phone: phoneNumber, code }: { phone: string, code: string }) => {
    try {
        const user = await User.findOne({ phone: phoneNumber })
        if (!user) {
            throw new Error("کاربری با این شماره همراه یافت نشد")
        }

        if (user?.otp?.code !== Number(code)) {
            throw new Error("کد ارسال شده صحیح نمیباشد")
        }

        const now = new Date().getTime()
        if (+user.otp.expiresIn < +now) {
            throw new Error("کد شما منقضی شده است ، کد جدید دریافت کنید")
        }

        const {firstname, lastname, phone, role, avatar, _id} = user

        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        await Session.deleteOne({phone})
        await Session.create({phone, role, expire: Date.now() + oneWeek})

        setCookie({firstname, lastname, phone, role, avatar, _id})

        return parseStringify({firstname, lastname, phone, role})
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            return parseStringify({ error: error.message });
        } else {
            return parseStringify({ error: 'خطایی رخ داده است، بار دیگر امتحان کنید.' });
        }
    }
}

async function saveUser(phone: string, code: number) {
    let otp = {
        code,
        expiresIn: (new Date().getTime() + 120000) // 2m
    }

    const existUserResult = await checkExistUser(phone)

    if (existUserResult) {
        return (await updateUserOtp(phone, otp))
    }
    return !!(await User.create({ phone, otp, role: ROLES.USER.name }))
}

async function checkExistUser(phone: string) {
    const user = await User.findOne({ phone })
    return !!user
}

async function updateUserOtp(phone: string, otp: object) {
    const result = await User.updateOne({ phone }, { $set: { otp } })
    return !!result.modifiedCount
}