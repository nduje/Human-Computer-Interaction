import FetchGuitars from "./fetchGuitars";

export default function GuitarsPage() {
  return (
    <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
      <h1>Guitars</h1>
      <FetchGuitars />
    </div>
  );
}
