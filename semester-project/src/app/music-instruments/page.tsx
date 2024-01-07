import Link from "next/link";

export default function MusicInstrumentsPage() {
  return (
    <div className="flex justify-center">
      <ul className="flex flex-row justify-around text-lg gap-9">
        <li>
          <Link href="/learning-and-resources/sheet-music">Guitars</Link>
        </li>
        <li>
          <Link href="/learning-and-resources/vinyl-records">Keyboards and Pianos</Link>
        </li>
        <li>
          <Link href="/learning-and-resources/blog-and-tutorials">Drums and Percussion</Link>
        </li>
      </ul>
    </div>
  );
}
