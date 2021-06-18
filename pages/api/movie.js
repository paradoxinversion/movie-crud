import Movie from "../../models/Movie";
import { connectToDatabase } from "../../mongodb";

export default async (req, res) => {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET": {
        const movies = await Movie.find({}).lean();
        res.status(200).json({ movies });
        break;
      }
      case "POST": {
        const { title, format, length, releaseYear, rating } = req.body;
        const newMovie = new Movie({
          title,
          format,
          length,
          releaseYear,
          rating,
        });

        await newMovie.save();
        res.status(200).json({ msg: "Movie Saved!" });
      }
      case "PUT": {
        break;
      }
      case "DELETE": {
        break;
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
