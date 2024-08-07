import { Schema, Document } from 'mongoose';

export interface IProductModel extends Document {
    name: string;
    description?: string;
    images: string[];
    slug: string;
    visible: boolean;
    category?: Schema.Types.ObjectId;
    brand?: Schema.Types.ObjectId;
    specs?: Schema.Types.ObjectId;
    features?: Schema.Types.ObjectId;
}

export interface IProductType extends IProductModel {
    _id: string
}

export interface IAddProductParams {
    name: string;
    description?: string;
    images?: FormData | undefined;
    slug: string;
    visible: boolean;
    category: string;
    brand: string;
}