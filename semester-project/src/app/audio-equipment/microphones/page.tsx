import Link from "next/link";
import FetchMicrophones from './fetchMicrophones';

export default function MicrophonesPage() {
  return (
    <div>
      <div className="flex justify-center">
        <ul className="flex flex-row justify-around text-lg gap-9">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/audio-equipment/amplifiers">Amplifiers</Link>
          </li>
          <li>
            <Link href="/audio-equipment/microphones">Microphones</Link>
          </li>
          <li>
            <Link href="/audio-equipment/pedals">Pedals</Link>
          </li>
          <li>
            <Link href="/audio-equipment/dj-equipment">DJ equipment</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-center justify-center align-middle font-bold p-14 text-4xl">
        <h1>Microphones</h1>
        <FetchMicrophones />
      </div>
    </div>
  );
}
