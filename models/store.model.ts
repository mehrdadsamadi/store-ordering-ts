
import { IStoreModel } from '@/types/store/store.types';
import { Schema, model, models, Model } from 'mongoose';

const storeSchema = new Schema<IStoreModel>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "user", required: true},
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: {lat: Number, lng: Number}, required: true }
});

const Store: Model<IStoreModel> = models?.store || model<IStoreModel>('store', storeSchema);

export default Store;