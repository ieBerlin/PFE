export default function TextAreaInput({label, ...props }) {
    return (
      <>
        <label className="block text-sm font-medium my-2">{label}</label>
        <textarea
          required
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm border-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          rows="3"
          placeholder={`Enter your ${label}`}
          {...props}
        ></textarea>
      </>
    );
  }