import FetchRecords from "./fetchVinylRecords";

export default function VinylRecordsPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Vinyl Records</h1>
      <FetchRecords />
    </div>
  );
}
