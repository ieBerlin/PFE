export default function DatePicker({
  label,
  required,
  dateName,
  timeName,
  defaultDateValue,
  defaultTimeValue,
}) {
  const dateId = `${dateName}-id`;
  const timeId = `${timeName}-id`;

  return (
    <div className="my-4">
      <label
        htmlFor={dateId}
        className="block text-sm font-medium mb-2 capitalize"
      >
        {label}
      </label>
      <div className="flex flex-row w-full justify-center items-center">
        <input
          required={required}
          type="date"
          id={dateId}
          className="outline-none text-gray-500 py-3 px-4 ps-9 pe-16 block border w-full border-gray-300 shadow-sm rounded-s-lg text-sm"
          name={dateName ?? ""}
          defaultValue={
            (defaultDateValue &&
              new Date(defaultDateValue).toISOString().split("T")[0]) ??
            ""
          }
        />

        <input
          required={required}
          type="time"
          id={timeId}
          className=" outline-none text-gray-500 py-3 px-4 ps-9 pe-16 block border items-center w-full border-gray-300 shadow-sm rounded-e-lg text-sm "
          name={timeName ?? ""}
          defaultValue={defaultTimeValue ?? ""}
        />
      </div>
    </div>
  );
}
