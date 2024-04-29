import { useState } from "react";
import { Menu } from "@headlessui/react";

export default function ChartBar({
  dates,
  data,
  maxYValue,
  color = "blue-500",
  label,
}) {
  const [selectedDate, setSelectedDate] = useState(dates[0]);
console.log(maxYValue)
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg px-5 py-4 rounded-lg">
      <div className="flex flex-row justify-between items-center mb-3">
        <strong className="font-bold text-xl">{label}</strong>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {selectedDate}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-400 transition-transform rotate-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Menu.Button>
          </div>
          <div>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {dates.map((date) => (
                  <Menu.Item key={date}>
                    {({ active }) => (
                      <button
                        onClick={() => handleDateSelect(date)}
                        href="#"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } px-4 py-2 text-sm flex w-full`}
                      >
                        {date}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </div>
        </Menu>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div />
        <h1 className="text-2xl font-bold">${maxYValue}</h1>
      </div>
      <div>
        <div className="flex flex-row mt-2 text-stone-500 font-medium text-sm">
          <div className="grid grid-rows-5 w-14 text-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <h1 key={index}>${Math.ceil((maxYValue * (5 - index)) / 5)}</h1>
            ))}
          </div>
          <div
            className="grid grid-cols-7 items-end w-full"
            style={{
              height: "250px",
            }}
          >
            {data.map((dataItem) => (
              <div
                key={`label-${dataItem.id}`}
                className={
                  "w-10 bg-" +
                  color +
                  " mx-auto my-0 rounded-t-md text-center text-sm text-white"
                }
                style={{
                  height: `${Math.ceil((250 * dataItem.value) / maxYValue)}px`,
                  verticalAlign: "middle",
                  lineHeight: `${Math.ceil(
                    (250 * dataItem.value) / maxYValue
                  )}px`,
                }}
              >
                {dataItem.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center py-2 text-black font-medium text-sm ml-14">
        {dates.map((date) => (
          <h2 key={date}>
            {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
          </h2>
        ))}
      </div>
    </div>
  );
}
