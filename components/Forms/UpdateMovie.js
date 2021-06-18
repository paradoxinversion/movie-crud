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
const updateMovieSchema = yup.object().shape({
  title: yup.string().min(MOVIE_TITLE_MIN).max(MOVIE_TITLE_MAX),
  format: yup.string().oneOf(MOVIE_FORMATS),
  length: yup.number().min(MOVIE_LENGTH_MIN).max(MOVIE_LENGTH_MAX),
  releaseYear: yup
    .number()
    .min(MOVIE_RELEASE_YEAR_MIN)
    .max(MOVIE_RELEASE_YEAR_MAX),
  rating: yup.number().min(MOVIE_RATING_MIN).max(MOVIE_RATING_MAX),
});
import { useRouter } from "next/router";

function UpdateMovie(props) {
  const router = useRouter();

  const initialValues = { ...props.movieData };
  return (
    <div>
      <Formik
        validationSchema={updateMovieSchema}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          const updateMovieFields = Object.keys(values).reduce(
            (updatedFieldsObject, movieField) => {
              if (values[movieField] !== initialValues[movieField]) {
                updatedFieldsObject[movieField] = values[movieField];
              }
              return updatedFieldsObject;
            },
            {}
          );

          const requestBody = {
            id: props.movieData._id,
            updateMovieFields,
          };
          const res = await axios.put("/api/movie", requestBody);
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
              className="text-red-700"
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
              className="text-red-700"
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
              className="text-red-700"
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
              className="text-red-700"
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
              className="text-red-700"
              name="rating"
              component="div"
            />
            <button type="submit" disabled={isSubmitting}>
              Update Movie
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateMovie;
