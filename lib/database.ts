import mongoose from 'mongoose';
import gameSchema from 'lib/gameSchema';
import { APIGame } from 'lib/types';
import config from 'lib/config';
mongoose.set('strictQuery', true);

export default mongoose.models.Games || mongoose.model<APIGame>('Games', gameSchema, 'Games');

mongoose
  .connect(config.mongoDbUri)
  .then(async () => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => console.log('Mongoose connection error:', err));
