// eslint-disable-next-line react/prop-types
export default function FormInput({ label }) {
  return (
    <div className="form-input">
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} />
    </div>
  );
}
