import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://ayushsrivastava2410:QGFy2vIzf4zaKBPP@cluster0.36jit.mongodb.net/db`, {
      
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;