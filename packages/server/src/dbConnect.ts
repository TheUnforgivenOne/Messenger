import mongoose from 'mongoose';

const connectToMongo = async () => {
  const connectionString: string = process.env.DB_CONNECTION || '';

  mongoose.set('strictQuery', false);

  return await mongoose.connect(connectionString);
};

export default connectToMongo;
