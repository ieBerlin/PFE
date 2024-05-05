export default function CategorySelect({ ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium my-2">Category</label>
      <div className="relative">
        <select
          className="border-2 p-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
          {...props}
        >
          <option value="kickboxing">Kickboxing</option>
          <option value="fitness">Fitness</option>
          <option value="cardio">Cardio</option>
          <option value="bodybuilding">Bodybuilding</option>
        </select>
      </div>
    </div>
  );
}
