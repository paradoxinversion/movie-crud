import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UpdateMovie from "../../components/Forms/UpdateMovie";

function UpdateMoviePage() {
  const [movieData, setMovieData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const getMovie = async () => {
      const getMovieResponse = await axios.get("/api/movie", {
        params: { id },
      });
      setMovieData(getMovieResponse.data.movie);
    };
    if (router.query.id) {
      getMovie();
    }
  }, [router.query.id]);
  return (
    <div className="max-w-prose m-auto">
      <p className="text-2xl mb-4">Update Movie</p>
      {movieData && <UpdateMovie movieData={movieData} />}
    </div>
  );
}
export default UpdateMoviePage;
