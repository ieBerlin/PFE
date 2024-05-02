export default function DateInput({ label, placeholder, ...props }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">{label}</label>
      <input
        required
        type="date"
        className="py-2 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
