import Property from '../models/property.js';
import { indexProperty } from '../elasticsearch/sync.js';

export const syncAllProperties = async () => {
  const props = await Property.find();
  for (const prop of props) {
    await indexProperty(prop);
  }
  console.log('✅ All properties synced to Elasticsearch');
};
