export default function SelectInput({ label, data, selectedField, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium my-2">{label}</label>
      <div className="relative">
        <select
          className="border-2 p-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
          {...props}
          defaultValue={selectedField}
        >
          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

//CategorySelect
