import FetchAmplifiers from "./fetchAmplifiers";

export default function AmplifiersPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Amplifiers</h1>
      <FetchAmplifiers />
    </div>
  );
}
