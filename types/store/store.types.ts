import { Schema, Document } from 'mongoose';

export interface IStoreInfo {
    name: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    location: {
        lat: number;
        lng: number
    }
}

export interface IStoreModel extends IStoreInfo, Document {
    name: string;
    phone: string;
    ownerId: Schema.Types.ObjectId;
    province: string;
    city: string;
    address: string;
    location: {
        lat: number;
        lng: number
    }
}

export interface IStoreType extends IStoreModel {
    _id: string
}