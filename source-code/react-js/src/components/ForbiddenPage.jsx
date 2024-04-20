export default function ForbiddenPage() {
  return (
    <div className=" h-screen w-full flex bg-gray-100 items-center justify-center flex-col text-center gap-2">
      <h1 className=" text-[100px] font-bold text-stone-950">403</h1>
      <h3 className="text-4xl font-semibold text-stone-950">Forbidden</h3>
      <p className="text-xl font-medium text-stone-950">
        Access denied to this source on the server is denied!</p>
        <a href="/" className="px-16 py-4 bg-blue-700 rounded-lg text-white font-bold tracking-wide text-lg mt-3 hover:bg-blue-600">
            Go to Home Page
        </a>
    </div>
  );
}
