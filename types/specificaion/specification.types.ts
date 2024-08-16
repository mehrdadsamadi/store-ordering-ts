import { Schema, Document } from 'mongoose';
import { IBrandType } from '../brand/brand.types';
import { ICategoryType } from '../category/category.types';
import { IProductType } from '../product/product.types';

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

export interface IAddSpecParams {
    _id: string,
    brand?: IBrandType,
    category?: ICategoryType;
    product?: IProductType;
    specifications: ISpecArray[]
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