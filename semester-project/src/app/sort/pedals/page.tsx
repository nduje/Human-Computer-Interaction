import FetchPedals from "./fetchPedals";

export default function PedalsPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Pedals</h1>
      <FetchPedals />
    </div>
  );
}
