import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
  path: '../env'
});

import Property from '../models/property.js';
import { indexProperty } from '../elasticsearch/sync.js';
const DB_Name = 'propertiesDB';
const syncAllProperties = async () => {
  try {
    // ✅ Connect to MongoDB first
    console.log(`Connecting to MongoDB at ${process.env.MONGODB_URI}/${DB_Name}`);
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    const props = await Property.find();
    for (const prop of props) {
      await indexProperty(prop);
    }

    console.log('✅ All properties synced to Elasticsearch');
    process.exit(0); // Exit cleanly
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1); // Exit with error
  }
};

syncAllProperties();
