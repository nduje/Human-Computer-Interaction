import Vinyls from "./fetchVinyls";

export default function VinylsPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Vinyls</h1>
      <Vinyls />
    </div>
  );
}
