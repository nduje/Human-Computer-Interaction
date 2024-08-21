import FetchMicrophones from "./fetchMicrophones";

export default function MicrophonesPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Microphones</h1>
      <FetchMicrophones />
    </div>
  );
}
