import { Schema, Document } from 'mongoose';

export interface ISpecSubtitles {
    subtitle: string;
    desc: string;
}

export interface ISpecArray {
    specTitle: string;
    subtitles: ISpecSubtitles[]
}

export interface ISpecModel extends Document {
    brand?: Schema.Types.ObjectId;
    category?: Schema.Types.ObjectId;
    product?: Schema.Types.ObjectId;
    specifications: ISpecArray[]
}

export interface ISpecType extends ISpecModel {
    _id: string
}

// export interface IAddSpecParams {
//     name: string;
//     description?: string;
//     images: FormData[] | undefined;
//     slug: string;
//     visible: boolean;
//     category: Schema.Types.ObjectId;
//     brand: Schema.Types.ObjectId;
// }