export default function Input({ label, placeholder, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium my-2">{label}</label>
      <input
        required
        type={type}
        className="py-3 px-4 block border-gray-200 border-2 w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
