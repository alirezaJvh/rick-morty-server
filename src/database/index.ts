import mongoose from 'mongoose';

const { DB_URI } = process.env;

const dbOptions = {
  autoIndex: false,
};

const connectMongo = async () => {
  try {
    if (DB_URI) {
      await mongoose.connect(DB_URI, dbOptions);
    } else {
      throw new Error('Provide DB URL');
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export { connectMongo };
