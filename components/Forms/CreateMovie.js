import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MOVIE_FORMATS,
  MOVIE_LENGTH_MAX,
  MOVIE_LENGTH_MIN,
  MOVIE_RATING_MAX,
  MOVIE_RATING_MIN,
  MOVIE_RELEASE_YEAR_MAX,
  MOVIE_RELEASE_YEAR_MIN,
  MOVIE_TITLE_MAX,
  MOVIE_TITLE_MIN,
} from "../../utils";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
const createMovieSchema = yup.object().shape({
  title: yup.string().min(MOVIE_TITLE_MIN).max(MOVIE_TITLE_MAX).required(),
  format: yup.string().oneOf(MOVIE_FORMATS).required(),
  length: yup.number().min(MOVIE_LENGTH_MIN).max(MOVIE_LENGTH_MAX).required(),
  releaseYear: yup
    .number()
    .min(MOVIE_RELEASE_YEAR_MIN)
    .max(MOVIE_RELEASE_YEAR_MAX)
    .required(),
  rating: yup.number().min(MOVIE_RATING_MIN).max(MOVIE_RATING_MAX).required(),
});
function CreateMovie() {
  const router = useRouter();
  return (
    <Formik
      validationSchema={createMovieSchema}
      initialValues={{
        title: "",
        format: "",
        length: "",
        releaseYear: "",
        rating: "",
      }}
      onSubmit={async (values) => {
        await axios.post("/api/movie", values);
        router.push("/");
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <label htmlFor="title">Title</label>
          <Field
            className="border rounded"
            id="title"
            type="text"
            name="title"
          />
          <ErrorMessage
            className="text-red-700 text-sm"
            name="title"
            component="div"
          />
          <label htmlFor="format">Format</label>
          <Field
            className="border rounded"
            id="format"
            as="select"
            name="format"
          >
            <option value="">Select a Format</option>
            <option value="Streaming">Streaming</option>
            <option value="DVD">DVD</option>
            <option value="VHS">VHS</option>
          </Field>
          <ErrorMessage
            className="text-red-700 text-sm"
            name="format"
            component="div"
          />
          <label htmlFor="length">Length</label>
          <Field
            className="border rounded"
            id="length"
            type="text"
            name="length"
          />
          <ErrorMessage
            className="text-red-700 text-sm"
            name="length"
            component="div"
          />
          <label htmlFor="release-year">Release Year</label>
          <Field
            className="border rounded"
            id="release-year"
            type="text"
            name="releaseYear"
          />
          <ErrorMessage
            className="text-red-700 text-sm"
            name="releaseYear"
            component="div"
          />
          <label htmlFor="rating">Rating</label>
          <Field
            className="border rounded"
            id="rating"
            type="text"
            name="rating"
          />
          <ErrorMessage
            className="text-red-700 text-sm"
            name="rating"
            component="div"
          />
          <div className="flex justify-between mt-4">
            <button
              className="border rounded p-2"
              type="submit"
              disabled={isSubmitting}
            >
              Add Movie
            </button>
            <button
              className="border rounded p-2"
              onClick={() => {
                router.push("/");
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateMovie;
