export default function ErrorBoundary({
  title = "Oops!",
  message = "Something went wrong.",
  status = "500",
}) {
  return (
    <div className="h-screen w-full flex bg-gray-100 items-center justify-center flex-col text-center gap-2">
      <h1 className="text-6xl font-bold text-stone-950">{status}</h1>
      <h2 className="text-4xl font-semibold text-stone-950">{title}</h2>
      <p className="text-lg font-medium text-stone-950">{message}</p>
      <a
        href="/"
        className="px-8 py-3 bg-blue-700 rounded-lg text-white font-bold tracking-wide text-lg mt-3 hover:bg-blue-600"
      >
        Return to Home
      </a>
    </div>
  );
}
