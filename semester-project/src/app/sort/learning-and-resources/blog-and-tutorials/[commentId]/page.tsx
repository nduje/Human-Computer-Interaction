import { Comment } from "../page";
import Link from "next/link";

interface Params {
  commentId: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getComment = async (id: string): Promise<Comment> => {
  const data = await fetch(`${BASE_API_URL}/comments/${id}`);
  return data.json();
};

export default async function BlogComment({ params }: { params: Params }) {
  const comment = await getComment(params.commentId);

  return (
    <div>
      <div className="flex justify-center">
        <ul className="flex flex-row justify-around text-lg gap-9">
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
      <h1 className="flex justify-center align-middle font-bold p-14 text-4xl">
        Blog and Tutorials
      </h1>
      <div className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <h1 className="text-3xl font-bold p-10 capitalize">
          <span className="text-neutral-400">Comment {comment.id}:</span>{" "}
          {comment.name}
        </h1>
        <p className="text-xl p-10">{comment.email}</p>
        <p className="text-xl p-10">{comment.body}</p>
      </div>
    </div>
  );
}
