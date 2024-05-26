import { useRef } from "react";

export default function SearchInput({ placeholder, onSearch }) {
  const inputRef = useRef();

  function handleSearch() {
    const inputValue = inputRef.current.value;
    onSearch(inputValue.trim());
  }

  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      onKeyUp={(e) => e.key === "Enter" && handleSearch()}
      type="text"
      className="py-2 px-4 truncate border-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 "
    />
  );
}
