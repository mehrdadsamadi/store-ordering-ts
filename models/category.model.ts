
import { ICategoryModel } from '@/types/category/category.types';
import { Schema, model, models, Model } from 'mongoose';

const categorySchema = new Schema<ICategoryModel>({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'category' },
    specs: { type: Schema.Types.ObjectId, ref: 'specification' },
    image: { type: String },
});

const Category: Model<ICategoryModel> = models?.category || model<ICategoryModel>('category', categorySchema);

export default Category;