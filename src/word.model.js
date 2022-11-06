import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongodbRemoteURI = process.env.MONGODB_URI;

const mongooseClient = mongoose.createConnection(mongodbRemoteURI, {
    dbName: 'kyoto-manga-db',
});

const { Schema } = mongoose;

const WordSchema = new Schema({
    language: { type: String },
    word: { type: String, index: true, unique: true },
});

export default mongooseClient.model('words', WordSchema);
