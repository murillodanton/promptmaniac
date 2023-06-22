import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected')
        return;
    }

    const mongoUri: string = process.env.MONGODB_URI || '';
    const options: ConnectOptions = {
        dbName: 'share_prompt',
    };

    try {
        await mongoose.connect(mongoUri, options);

        isConnected = true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}
