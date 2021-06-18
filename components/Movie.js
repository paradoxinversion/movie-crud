import Link from "next/link";
import PropTypes from "prop-types";
import { MOVIE_FORMATS } from "../utils";

function Movie(props) {
  const {
    movie: { title, format, length, releaseYear, rating, _id },
  } = props;
  return (
    <div className="border rounded p-2">
      <div className="mb-4">
        <strong className="text-bold">{title}</strong>
        <p>Release: {releaseYear}</p>
        <p>{length} minutes</p>
        <p>Format: {format}</p>
        <p>Rating: {rating}/5</p>
      </div>
      <div className="flex justify-between">
        <Link href={`/edit/${_id}`}>
          <a className="border rounded p-1">Update Movie</a>
        </Link>
        <button
          className="border rounded p-1 bg-red-500 text-white"
          onClick={() => {
            props.deleteMovie(_id);
          }}
        >
          Delete Movie
        </button>
      </div>
    </div>
  );
}

Movie.propTypes = {
  movie: {
    title: PropTypes.string.isRequired,
    format: PropTypes.oneOf(MOVIE_FORMATS).isRequired,
    length: PropTypes.number.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    setMovieEditState: PropTypes.func,
    deleteMovie: PropTypes.func,
  },
};

export default Movie;
