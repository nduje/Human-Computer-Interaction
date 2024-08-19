import FetchDrums from "./fetchDrumsAndPercussion";

export default function DrumsAndPercussionPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Drums and Percussion</h1>
      <FetchDrums />
    </div>
  );
}
