import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
    minLength: 1,
    maxLength: 50,
  },
  format: { type: String, enum: ["VHS", "DVD", "Streaming"] },
  length: { type: Number, min: 0, max: 500 },
  releaseYear: { type: Number, min: 1800, max: 2100 },
  rating: { type: Number, min: 1, max: 5 },
});

let Movie;

try {
  Movie = mongoose.model("Movie");
} catch {
  Movie = mongoose.model("Movie", MovieSchema);
}
export default Movie;
