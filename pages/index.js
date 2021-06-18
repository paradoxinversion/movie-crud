import CreateMovie from "../components/Forms/CreateMovie";
import UpdateMovie from "../components/Forms/UpdateMovie";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
function HomePage() {
  const [movieData, setMovieData] = useState([]);
  const [showMovieCreate, setShowMovieCreate] = useState(false);
  useEffect(() => {
    const getMovies = async () => {
      const getMoviesResponse = await axios.get("/api/movie");
      debugger;
      setMovieData(getMoviesResponse.data.movies);
    };
    getMovies();
  }, []);

  return (
    <div>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <p>Movie CRUD</p>
      <button
        onClick={() => {
          setShowMovieCreate(true);
        }}
      >
        Add a Movie
      </button>
      {showMovieCreate && (
        <CreateMovie
          hideForm={() => {
            setShowMovieCreate(false);
          }}
        />
      )}
      <MovieList movieData={movieData} />
    </div>
  );
}

export default HomePage;
