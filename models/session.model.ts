import { ROLES } from '@/constants';
import { ISessionModel } from '@/types/session/sessoion.types';
import { Schema, model, models, Model } from 'mongoose';

const sessionSchema = new Schema<ISessionModel>({
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: (Object.keys(ROLES).map(key => ROLES[key].name)) },
    expire: { type: Date, default: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)) }
});

const Session: Model<ISessionModel> = models?.session || model<ISessionModel>('session', sessionSchema);

export default Session;