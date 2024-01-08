import Link from "next/link";
import FetchKeyboards from './fetchKeyboardsAndPiano';

export default function KeyboardsAndPianosPage() {
  return (
    <div>
      <div className="flex justify-center">
        <ul className="flex flex-row justify-around text-lg gap-9">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/music-instruments/guitars">Guitars</Link>
          </li>
          <li>
            <Link href="/music-instruments/keyboards-and-piano">
              Keyboards and Pianos
            </Link>
          </li>
          <li>
            <Link href="/music-instruments/drums-and-percussion">
              Drums and Percussion
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
        <h1>Keyboards and Pianos</h1>
        <FetchKeyboards />
      </div>
    </div>
  );
}
