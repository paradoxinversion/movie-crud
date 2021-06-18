import PropTypes from "prop-types";
import { MOVIE_FORMATS } from "../utils";

function Movie(props) {
  const {
    movie: { title, format, length, releaseYear, rating },
  } = props;
  return (
    <div className="border rounded">
      <p>{title}</p>
      <p>Release: {releaseYear}</p>
      <p>{length} minutes</p>
      <p>Format: {format}</p>
      <p>Rating: {rating}/5</p>
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
  },
};

export default Movie;
