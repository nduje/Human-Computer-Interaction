import Link from "next/link";

export default function SheetMusicPage() {
  return (
    <div>
      <div className="flex justify-center">
        <ul className="flex flex-row justify-around text-lg gap-9">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/learning-and-resources/sheet-music">Sheet Music</Link>
          </li>
          <li>
            <Link href="/learning-and-resources/vinyl-records">
              Vinyl Records
            </Link>
          </li>
          <li>
            <Link href="/learning-and-resources/blog-and-tutorials">
              Blog and Tutorials
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center align-middle font-bold p-14 text-4xl">
        <h1>Sheet Music</h1>
      </div>
    </div>
  );
}
