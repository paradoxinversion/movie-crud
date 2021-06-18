import Movie from "../models/Movie";

export const getMovies = async () => {
  return await Movie.find({}).lean();
};

export const getMovie = async (id) => {
  return await Movie.findById(id).lean();
};

export const createMovie = async (
  title,
  format,
  length,
  releaseYear,
  rating
) => {
  const newMovie = new Movie({
    title,
    format,
    length,
    releaseYear,
    rating,
  });

  await newMovie.save();
  return newMovie;
};

export const updateMovie = async (id, updateFields) => {
  if (!id || !updateFields) {
    throw new Error("ID and/or Update fields are missing or invalid.");
  }
  const movieUpdate = await Movie.findByIdAndUpdate(id, updateFields, {
    new: true,
    lean: true,
    runValidators: true,
  });

  return movieUpdate;
};

export const deleteMovie = async (id) => {
  if (!id) {
    throw new Error(
      "A Movie ID is required. Please provide a valid ID to delete a movie."
    );
  }
  await Movie.findByIdAndRemove(id);
};
