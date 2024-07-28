import { Document } from 'mongoose';

export interface IUserModel extends Document {
    phone: string;
    firstname?: string;
    lastname?: string;
    avatar?: string;
    otp?: {
        code: number;
        expiresIn: number;
    };
    role?: string
}

export interface ISaveUserBaseInfoParams {
    phone: string;
    firstname?: string;
    lastname?: string;
    avatar?: FormData | undefined;
    role?: string
}