import CreateMovie from "../components/Forms/CreateMovie";
import UpdateMovie from "../components/Forms/UpdateMovie";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import { signIn, signOut, useSession } from "next-auth/client";
function HomePage() {
  const [session, loading] = useSession();
  const [movieData, setMovieData] = useState([]);
  const [movieFormData, setMovieFormData] = useState({
    form: null,
    formData: null,
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const getMoviesResponse = await axios.get("/api/movie");
        setMovieData(getMoviesResponse.data.movies);
      } catch (e) {
        console.log(e);
      }
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
  if (session) {
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

  return (
    <div>
      <p>
        Welcome! You must log in to use this service. Click the button below to
        sign in with Google.
      </p>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}

export default HomePage;
