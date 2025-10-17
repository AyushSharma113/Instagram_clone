import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI as string | undefined
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment')
        }
        await mongoose.connect(uri);
        console.log('mongodb connected successfully.');
    } catch (error) {
           console.error('Error connecting to MongoDB:', error);
    }
}
export default connectDB;