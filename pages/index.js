import CreateMovie from "../components/Forms/CreateMovie";
import UpdateMovie from "../components/Forms/UpdateMovie";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
function HomePage() {
  const [movieData, setMovieData] = useState([]);
  const [showMovieCreate, setShowMovieCreate] = useState(false);
  const [showMovieUpdate, setShowMovieUpdate] = useState(false);
  const [movieFormData, setMovieFormData] = useState({
    form: null,
    formData: null,
  });
  useEffect(() => {
    const getMovies = async () => {
      const getMoviesResponse = await axios.get("/api/movie");
      setMovieData(getMoviesResponse.data.movies);
    };
    getMovies();
  }, []);

  const setMovieEditState = (movieData) => {
    setMovieFormData({
      form: "edit",
      formData: movieData,
    });
  };
  const deleteMovie = async (id) => {
    await axios.delete("/api/movie", { data: { id } });
    const remainingMovies = movieData.filter((movie) => movie._id !== id);
    setMovieData(remainingMovies);
  };
  return (
    <div>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <p>Movie CRUD</p>
      <Link href="/new">
        <a>Add a Movie</a>
      </Link>
      {showMovieCreate && (
        <CreateMovie
          hideForm={() => {
            setShowMovieCreate(false);
          }}
        />
      )}
      {movieFormData.form === "edit" && movieFormData.formData && (
        <UpdateMovie movieData={movieFormData.formData} />
      )}
      <MovieList
        setMovieEditState={setMovieEditState}
        deleteMovie={deleteMovie}
        movieData={movieData}
      />
    </div>
  );
}

export default HomePage;
