export default function CategorySelect({ selectedField, ...props }) {
  const categories = [
    { value: "kickboxing", label: "Kickboxing" },
    { value: "fitness", label: "Fitness" },
    { value: "cardio", label: "Cardio" },
    { value: "bodybuilding", label: "Bodybuilding" },
  ];

  return (
    <div>
      <label className="block text-sm font-medium my-2">Category</label>
      <div className="relative">
        <select
          className="border-2 p-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
          {...props}
          defaultValue={selectedField}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
