import Link from "next/link";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getComments = async (): Promise<Comment[]> => {
  const data = await fetch(`${BASE_API_URL}/comments`);
  return data.json();
};

export default async function BlogAndTutorialsPage() {
  const comments = await getComments();
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
      <h1 className="flex justify-center align-middle font-bold p-14 text-4xl">
        Blog and Tutorials
      </h1>
      <div className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <ul className="flex flex-col gap-8">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Link href={`blog-and-tutorials/${comment.id}`}>
                <span className="text-2xl text-purple-500">
                  Comment {comment.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
