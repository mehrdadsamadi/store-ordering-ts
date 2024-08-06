import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/store-ordering";

interface Cached {
    connection: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

const cached: Cached = {
    connection: null,
    promise: null,
};

// import all models
import "@/models/category.model"
import "@/models/brand.model"
import "@/models/feature.model"
import "@/models/specification.model"
import "@/models/product.model"
import "@/models/store.model"
import "@/models/user.model"
// import "@/models/order.model"
// import "@/models/bid.model"
import "@/models/session.model"

async function connectMongo(): Promise<typeof mongoose> {
    if (!MONGO_URI) {
        throw new Error('Please define the MONGO_URI environment variable inside .env');
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGO_URI, opts);
    }
    try {
        cached.connection = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.connection;
}

export default connectMongo;