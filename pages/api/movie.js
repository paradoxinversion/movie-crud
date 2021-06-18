import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../../dbActions/movie";
import { connectToDatabase } from "../../mongodb";

export default async (req, res) => {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET": {
        // if there's a query, we're getting a single movie
        if (req.query.id) {
          const movie = await getMovie(req.query.id);
          res.status(200).json({ movie });
        } else {
          const movies = await getMovies();
          res.status(200).json({ movies });
        }
        break;
      }

      case "POST": {
        const { title, format, length, releaseYear, rating } = req.body;
        const movie = await createMovie(
          title,
          format,
          length,
          releaseYear,
          rating
        );
        res.status(201).json({ msg: "Movie Saved!", movie });
        break;
      }

      case "PUT": {
        const { id, updateMovieFields: updateFields } = req.body;
        const movie = await updateMovie(id, updateFields);
        res.status(200).json({ msg: "Movie Updated!", movie });
        break;
      }

      case "DELETE": {
        const { id } = req.body;
        await deleteMovie(id);
        res.status(200).json({ msg: "Movie Deleted!" });
        break;
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
