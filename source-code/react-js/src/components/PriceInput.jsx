export default function PriceInput() {
  return (
    <div>
      <div className="flex w-full flex-col">
        <label
          htmlFor="hs-select-label"
          className="block text-sm font-medium mb-2 dark:text-black capitalize"
        >
          Price
        </label>
        <div className="relative flex w-full ">
          <input
            type="text"
            id="hs-input-with-leading-and-trailing-icon"
            name="hs-input-with-leading-and-trailing-icon"
            className="flex w-full  py-3 px-4 ps-9 pe-16 border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
            placeholder="Enter price"
          />
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 text-gray-500">
            $
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4 text-gray-500">
            DZD
          </div>
        </div>
      </div>
    </div>
  );
}