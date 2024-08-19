import FetchDJEquipment from "./fetchDJEquipment";

export default function DJEquipmentPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>DJ equipment</h1>
      <FetchDJEquipment />
    </div>
  );
}
