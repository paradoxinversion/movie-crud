import mongoose from "mongoose";

let cached = global.mongoConnection;
if (!cached) {
  cached = global.mongoConnection = null;
} else {
  console.log("Using cached connection");
}

export async function connectToDatabase() {
  if (cached) {
    return cached;
  }
  const mongoConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };
  cached = await mongoose.connect(
    process.env.MONGODB_URI,
    mongoConnectionOptions
  );
}
