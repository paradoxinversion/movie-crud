import Movie from "./Movie";
import PropTypes from "prop-types";

function MovieList(props) {
  const { movieData } = props;
  return (
    <div>
      {movieData.map((movie) => (
        <Movie movie={movie} />
      ))}
    </div>
  );
}

MovieList.defaultProps = {
  movieData: [],
};

MovieList.propTypes = {
  movieData: PropTypes.array.isRequired,
};
export default MovieList;
