export default function PhoneNumberInput({ ...props }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">Phone Number</label>
      <div className="flex">
        <div
          className=" outline-none flex-shrink-0 z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 "
          type="button"
        >
          <svg
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className=" w-6"
            preserveAspectRatio="xMidYMid meet"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                fill="#006233"
                d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h14V5H4z"
              />

              <path
                fill="#EEE"
                d="M32 5H18v26h14a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
              />

              <path
                fill="#D20F34"
                d="M20 24c-3.315 0-6-2.685-6-6c0-3.314 2.685-6 6-6c1.31 0 2.52.425 3.507 1.138A7.332 7.332 0 0 0 18 10.647A7.353 7.353 0 0 0 10.647 18A7.353 7.353 0 0 0 18 25.354c2.195 0 4.16-.967 5.507-2.492A5.963 5.963 0 0 1 20 24z"
              />

              <path
                fill="#D20F34"
                d="M25.302 18.23l-2.44.562l-.22 2.493l-1.288-2.146l-2.44.561l1.644-1.888l-1.287-2.147l2.303.98l1.644-1.889l-.22 2.494z"
              />
            </g>
          </svg>
          <p style={{ marginLeft: "1px" }}>+213</p>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg   border-gray-300 border-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            placeholder="699-213-213"
            required
            {...props}
          />
        </div>
      </div>
    </>
  );
}
