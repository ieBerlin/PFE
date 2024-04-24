import { useEffect, useRef, useState } from "react";

export default function FilterDropdown({
  currentSelectedData,
  filterOptionsData,
  setData,
}) {
  const dropdownMenuRef = useRef(null);
  const buttonRef = useRef();

  const [isFilterDropdownMenuOpen, setIsFilterDropdownMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !buttonRef.current ||
        buttonRef.current.contains(event.target) ||
        !dropdownMenuRef.current ||
        dropdownMenuRef.current.contains(event.target)
      ) {
        return;
      }
      setIsFilterDropdownMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsFilterDropdownMenuOpen]);

  const toggleFilterDropdownMenu = () => {
    setIsFilterDropdownMenuOpen((prevState) => !prevState);
  };

  const toggleFilteredCoachesChange = (key, field) => {
    setData((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], [field]: !prevState[key][field] },
    }));
  };

  return (
    <div className="relative" ref={dropdownMenuRef}>
      <button
        className="text-stone-900 bg-white hover:bg-gray-50 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        type="button"
        ref={buttonRef}
        onClick={toggleFilterDropdownMenu}
      >
        <p>Filter</p>
        <svg
          className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
            isFilterDropdownMenuOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isFilterDropdownMenuOpen && (
        <div
          className="ring-1 ring-inset ring-gray-300 z-10 absolute right-0 mt-1 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
          style={{ top: "calc(100% + 5px)" }}
        >
          {filterOptionsData.map(({ title, options }, index) => (
            <FilterOptions
              key={index}
              title={title.replace(".", " ")}
              options={options}
              selectedOptions={currentSelectedData[title.replace(".", "")]}
              onChange={(field) =>
                toggleFilteredCoachesChange(title.replace(".", ""), field)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterOptions({ title, options, selectedOptions, onChange }) {
  return (
    <>
      <p className="text-black font-semibold pl-3 py-2 capitalize">{title}</p>
      <ul className="p-3 space-y-3 text-sm">
        {options.map((option) => (
          <li key={option}>
            <div className="flex items-center">
              <input
                onChange={() => onChange(option)}
                checked={selectedOptions[option]}
                id={`checkbox-${title}-${option}`}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label
                htmlFor={`checkbox-${title}-${option}`}
                className="ms-2 text-sm font-medium text-gray-600"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
