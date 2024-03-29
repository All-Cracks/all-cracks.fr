import mongoose from 'mongoose';
import gameSchema from 'lib/gameSchema';
import { APIGame } from 'lib/types';
mongoose.set('strictQuery', true);

export default mongoose.models.Games || mongoose.model<APIGame>('Games', gameSchema, 'Games');

mongoose.connection ||
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(async () => {
      console.log('✅ MongoDB connected');
    })
    .catch((err) => console.log('Mongoose connection error:', err));
