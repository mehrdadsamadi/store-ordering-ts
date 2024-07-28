import { Schema, Document } from 'mongoose';

export interface ICategoryModel extends Document {
    name: string;
    parent?: Schema.Types.ObjectId;
    specs?: Schema.Types.ObjectId;
    image?: string;
}

export interface ICategoryType extends ICategoryModel {
    _id: string
}

export interface IAddCategoryParams {
    name: string;
    image?: FormData | undefined;
    parent?: string | undefined;
}