import { Schema, Document } from 'mongoose';

export interface IFeatureInfo {
    name: string;
    amount: string;
    image: string;
    wholesale_quantity: number;
    wholesale_price: number;
    retail_price: number;
    quantity: number;
    available: boolean;
}

export interface IFeatureBody {
    featureTitle: string;
    features: IFeatureInfo[]
}

export interface IFeatureModel extends Document {
    product?: Schema.Types.ObjectId;
    features: IFeatureBody[]
}

export interface IFeatureType extends IFeatureModel {
    _id: string
}