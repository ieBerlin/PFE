export default function GenderInput() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Gender</label>
      <div className="flex gap-x-6 border-gray-200 border-2 w-min px-4 py-2 rounded-lg">
        <div className="flex items-center">
          <input
            value="male"
            defaultChecked
            id="male-radio"
            type="radio"
            name="gender"
            className="mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-500">Male</label>
        </div>
        <div className="flex items-center">
          <input
            value="female"
            id="female-radio"
            type="radio"
            name="gender"
            className="mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-500">Female</label>
        </div>
      </div>
    </>
  );
}
