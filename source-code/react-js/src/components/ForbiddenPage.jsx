export default function ForbiddenPage({
  title = "Forbidden",
  message = " Access denied to this source on the server is denied!",
  isThrownAsAnError,
}) {
  return (
    <div
      className=" w-full flex bg-gray-100 items-center justify-center flex-col text-center gap-2"
      style={{ height: isThrownAsAnError ? "100vh" : "calc(100vh - 60px)" }}
    >
      <h1 className=" text-[100px] font-bold text-stone-950">403</h1>
      <h3 className="text-4xl font-semibold text-stone-950">{title}</h3>
      <p className="text-xl font-medium text-stone-950">{message}</p>

      {isThrownAsAnError && (
        <a
          href="/"
          className="px-16 py-4 bg-blue-700 rounded-lg text-white font-bold tracking-wide text-lg mt-3 hover:bg-blue-600"
        >
          Go to Home Page
        </a>
      )}
    </div>
  );
}
