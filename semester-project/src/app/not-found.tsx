import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center align-middle text-center font-roboto text-base-colors-200 font-medium w-fit m-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-9xl m-6 md:m-12">Whoops,<br/>The <span className="inline text-base-colors-300 font-bold">String</span> Broke!</h1>
        <h1 className="text-xl md:text-7xl">This page seems to have gone out of <span className="inline text-base-colors-300 font-bold">tune</span>.</h1>
        <h1 className="text-xl md:text-7xl">Let&apos;s get back on <span className="inline text-base-colors-300 font-bold">track</span>.</h1>
        <Link href="/" className="inline-block justify-center items-center text-center align-middle text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 md:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-6 md:mt-12">
        <h3 className="font-bold text-md md:text-3xl">
          Return Home
        </h3>
      </Link>
    </div>
  );
}