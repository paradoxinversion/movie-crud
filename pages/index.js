import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import { signIn, signOut, useSession } from "next-auth/client";
function HomePage() {
  const [session, loading] = useSession();
  const [movieData, setMovieData] = useState([]);

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

  const deleteMovie = async (id) => {
    await axios.delete("/api/movie", { data: { id } });
    const remainingMovies = movieData.filter((movie) => movie._id !== id);
    setMovieData(remainingMovies);
  };
  if (session) {
    return (
      <div className="m-4">
        <header className="mb-4">
          <p className="text-2xl">Movie CRUD</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </header>
        <main>
          <Link href="/new">
            <a className="border rounded inline-block p-1 mb-4">Add a Movie</a>
          </Link>

          <MovieList deleteMovie={deleteMovie} movieData={movieData} />
        </main>
      </div>
    );
  }

  return (
    <main>
      <p>
        Welcome! You must log in to use this service. Click the button below to
        sign in with Google.
      </p>
      <button onClick={() => signIn()}>Sign In</button>
    </main>
  );
}

export default HomePage;
