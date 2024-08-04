import { IProductModel } from '@/types/product/product.types';
import { Schema, model, models, Model } from 'mongoose';

const productSchema = new Schema<IProductModel>({
    category: { type: Schema.Types.ObjectId, ref: "category" },
    brand: { type: Schema.Types.ObjectId, ref: "brand" },
    specs: { type: Schema.Types.ObjectId, ref: "specification" },
    features: { type: Schema.Types.ObjectId, ref: "feature" },
    description: { type: String },
    name: { type: String, required: true },
    images: {type: [String], required: true},
    slug: {type: String, required: true},
    visible: {type: Boolean, default: true},
});

const Product: Model<IProductModel> = models?.product || model<IProductModel>('product', productSchema);

export default Product;