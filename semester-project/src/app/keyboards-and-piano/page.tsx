import FetchKeyboards from "./fetchKeyboardsAndPiano";

export default function KeyboardsAndPianosPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Keyboards and Pianos</h1>
      <FetchKeyboards />
    </div>
  );
}
