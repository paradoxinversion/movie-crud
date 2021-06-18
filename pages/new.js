import CreateMovie from "../components/Forms/CreateMovie";

function NewMovie() {
  return (
    <main className="max-w-prose m-auto">
      <p className="text-2xl mb-4">Add a new Movie</p>
      <CreateMovie />
    </main>
  );
}
export default NewMovie;
