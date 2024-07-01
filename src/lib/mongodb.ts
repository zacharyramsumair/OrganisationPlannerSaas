import mongoose from "mongoose";

export const runtime =  'nodejs'


const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Connected to MongoDB.");
	} catch (error:any) {
		console.log(`Error: ${error.message}`);
	}
};

export default connectMongoDB;
