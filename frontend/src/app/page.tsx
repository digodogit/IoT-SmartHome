import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <Link href="/login">
        <p className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-400 hover:text-white">
          loginPage
        </p>
      </Link>
      <Link href="/dashboard">
        <p className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-400 hover:text-white">
          dashboard
        </p>
      </Link>
      <Link href="/logout">
        <p className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-400 hover:text-white">
          logout
        </p>
      </Link>
    </div>
  );
}
