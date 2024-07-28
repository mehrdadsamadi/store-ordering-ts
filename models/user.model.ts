
import { ROLES } from '@/constants';
import { IUserModel } from '@/types/user/user.types';
import { Schema, model, models, Model } from 'mongoose';

const userSchema = new Schema<IUserModel>({
    firstname: { type: String },
    lastname: { type: String },
    avatar: { type: String },
    phone: { type: String, required: true },
    otp: {type: Object, default: {
        code: 0,
        expiresIn: 0
    }},
    role: { type: String, default: ROLES.USER.name, enum: (Object.keys(ROLES).map((key: string) => ROLES[key].name)) }
}, {
    timestamps: true
});

const User: Model<IUserModel> = models?.user || model<IUserModel>('user', userSchema);

export default User;