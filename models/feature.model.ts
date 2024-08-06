import { IFeatureBody, IFeatureInfo, IFeatureModel } from '@/types/feature/feature.types';
import { Schema, model, models, Model } from 'mongoose';

const featurInfoSchema = new Schema<IFeatureInfo>({
    name: { type: String, required: true },
    amount: { type: String, required: true },
    image: { type: String, required: true },
    wholesale_quantity: { type: Number, required: true },
    wholesale_price: { type: Number, required: true },
    retail_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    available: { type: Boolean, default: true },
})

const featurBodySchema = new Schema<IFeatureBody>({
    featureTitle: { type: String, required: true },
    features: { type: [featurInfoSchema], required: true },
})

const featureSchema = new Schema<IFeatureModel>({
    product: { type: Schema.Types.ObjectId, ref: "product" },
    features: { type: [featurBodySchema], required: true }
})

const Feature: Model<IFeatureModel> = models?.feature || model<IFeatureModel>('feature', featureSchema);

export default Feature;