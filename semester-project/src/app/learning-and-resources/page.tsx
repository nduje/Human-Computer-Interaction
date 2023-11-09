import Link from "next/link";

export default function LearningAndResourcesPage() {
  return (
    <div className="flex justify-center">
      <ul className="flex flex-row justify-around text-lg gap-9">
        <li>
          <Link href="/learning-and-resources/sheet-music">Sheet Music</Link>
        </li>
        <li>
          <Link href="/learning-and-resources/vinyl-records">Vinyl Records</Link>
        </li>
        <li>
          <Link href="/learning-and-resources/blog-and-tutorials">Blog and Tutorials</Link>
        </li>
      </ul>
    </div>
  );
}
