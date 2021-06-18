import Movie from "./Movie";
import PropTypes from "prop-types";

function MovieList(props) {
  const { movieData, setMovieEditState, deleteMovie } = props;
  return (
    <div id="movies-list">
      <p className="text-xl">Movies</p>
      <div className="grid grid-cols-4 gap-4">
        {movieData.map((movie) => (
          <Movie
            movie={movie}
            deleteMovie={deleteMovie}
            setMovieEditState={setMovieEditState}
          />
        ))}
      </div>
    </div>
  );
}

MovieList.defaultProps = {
  movieData: [],
};

MovieList.propTypes = {
  movieData: PropTypes.array.isRequired,
  setMovieEditState: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};
export default MovieList;
