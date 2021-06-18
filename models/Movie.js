import mongoose, { Schema } from "mongoose";
import {
  MOVIE_FORMATS,
  MOVIE_LENGTH_MAX,
  MOVIE_LENGTH_MIN,
  MOVIE_RATING_MAX,
  MOVIE_RATING_MIN,
  MOVIE_RELEASE_YEAR_MAX,
  MOVIE_RELEASE_YEAR_MIN,
  MOVIE_TITLE_MAX,
  MOVIE_TITLE_MIN,
} from "../utils";

const MovieSchema = new Schema({
  title: {
    type: String,
    minLength: MOVIE_TITLE_MIN,
    maxLength: MOVIE_TITLE_MAX,
  },
  format: { type: String, enum: MOVIE_FORMATS },
  length: { type: Number, min: MOVIE_LENGTH_MIN, max: MOVIE_LENGTH_MAX },
  releaseYear: {
    type: Number,
    min: MOVIE_RELEASE_YEAR_MIN,
    max: MOVIE_RELEASE_YEAR_MAX,
  },
  rating: { type: Number, min: MOVIE_RATING_MIN, max: MOVIE_RATING_MAX },
});

let Movie;

try {
  Movie = mongoose.model("Movie");
} catch {
  Movie = mongoose.model("Movie", MovieSchema);
}
export default Movie;
