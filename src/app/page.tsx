import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Welcome to Acme
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Get started with your account in just a few steps.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-cyan-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-cyan-700"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
