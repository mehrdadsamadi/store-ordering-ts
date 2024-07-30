import { Schema, Document } from 'mongoose';

export interface IBrandModel extends Document {
    name: string;
    specs?: Schema.Types.ObjectId;
    image?: string;
}

export interface IBrandType extends IBrandModel {
    _id: string
}

export interface IAddBrandParams {
    name: string;
    image?: FormData | undefined;
}