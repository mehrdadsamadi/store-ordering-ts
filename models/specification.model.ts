import { ISpecArray, ISpecModel, ISpecSubtitles } from '@/types/specificaion/specification.types';
import { Schema, model, models, Model } from 'mongoose';

const subtitlesSchema = new Schema<ISpecSubtitles>({
    subtitle: { type: String, required: true },
    desc: { type: String, required: true },
})

const specSchema = new Schema<ISpecArray>({
    specTitle: { type: String, required: true },
    subtitles: { type: [subtitlesSchema], required: true },
})

const specificationSchema = new Schema<ISpecModel>({
    brand: { type: Schema.Types.ObjectId, ref: "brand" },
    category: { type: Schema.Types.ObjectId, ref: "category" },
    product: { type: Schema.Types.ObjectId, ref: "product" },
    specifications: { type: [specSchema], required: true }
});

const Specification: Model<ISpecModel> = models?.specification || model<ISpecModel>('specification', specificationSchema);

export default Specification;