import mongoose from 'mongoose';

const { DB_URL } = process.env;

const dbOptions = {
  autoIndex: false,
};

const connectMongo = async (): Promise<void> => {
  try {
    if (DB_URL) {
      await mongoose.connect(DB_URL, dbOptions);
      console.log('connection established');
    } else {
      throw new Error('Provide DB URL');
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export { connectMongo };
