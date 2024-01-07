import Link from "next/link";

export default function AudioEquipmentPage() {
  return (
    <div className="flex justify-center">
      <ul className="flex flex-row justify-around text-lg gap-9">
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
  );
}
