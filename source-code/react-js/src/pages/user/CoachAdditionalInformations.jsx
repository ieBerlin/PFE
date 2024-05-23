import { TrashIcon } from "@heroicons/react/24/outline";
export default function CoachAdditionalInformations() {
  return (
    <>
      <p className="block text-sm font-medium my-3">Certifications</p>
      <div
        className="w-full grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit , minmax(250px , 1fr))",
        }}
      >
        <AddImage />
        <AddImage />
        <AddImage />
      </div>
      {/* Save Button */}
      <div className="flex  justify-end w-full">
        <button className={`font-medium rounded-md bg-orange-500 px-3 py-2 text-white hover:bg-orange-400`}>
          Add Certification
        </button>
      </div>
    </>
  );
}
function AddImage() {
  return (
    <div className="relative inline-block">
      <img
        className="rounded-md"
        src="https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/class-size.jpg?fit=2266%2C1322&ssl=1"
        alt=""
      />
      <button>
        <TrashIcon className=" bg-gray-200 p-1 rounded-full w-7 h-7 absolute right-2 top-2" />
      </button>
    </div>
  );
}
