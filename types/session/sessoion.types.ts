import { Document } from 'mongoose';

export interface ISessionModel extends Document {
    phone: string;
    role: string;
    expire: Date
}