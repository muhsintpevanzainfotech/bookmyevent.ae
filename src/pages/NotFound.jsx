import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
