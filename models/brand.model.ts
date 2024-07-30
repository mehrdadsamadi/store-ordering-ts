import { IBrandModel } from '@/types/brand/brand.types';
import { Schema, model, models, Model } from 'mongoose';

const brandSchema = new Schema<IBrandModel>({
    name: { type: String, required: true },
    specs: { type: Schema.Types.ObjectId, ref: 'specification' },
    image: { type: String },
});

const Brand: Model<IBrandModel> = models?.brand || model<IBrandModel>('brand', brandSchema);

export default Brand;