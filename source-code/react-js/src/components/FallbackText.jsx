export default function FallbackText({ title }) {
  return (
    <section className=" flex h-full w-full flex-col">
      <p className="text-gray-700 text-xl font-semibold text-center mt-7 bg-white shadow-md flex w-full py-3 justify-center">
        {title}...
      </p>
    </section>
  );
}
