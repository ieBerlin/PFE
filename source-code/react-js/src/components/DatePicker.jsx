export default function DatePicker({label}) {
  return (
    <div className="my-4">
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        {label}
      </label>
      <div className="flex flex-row w-full justify-center items-center">
        <input
          type="date"
          className="outline-none text-gray-500  py-3 px-4 ps-9 pe-16 block border w-full border-gray-300 shadow-sm rounded-s-lg text-sm "
          name=""
          id=""
        />
        <input
          type="time"
          id="time"
          className=" outline-none text-gray-500 py-3 px-4 ps-9 pe-16 block border items-center w-full border-gray-300 shadow-sm rounded-e-lg text-sm "
        />
      </div>
    </div>
  );
}