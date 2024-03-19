import FormInput from "./FormInput";

export default function Form() {
  return (
    <>
      <form>
        <div className="email">
          <FormInput label="email" />
        </div>
        <div className="password">
          <FormInput label="password" />
        </div>
      </form>
    </>
  );
}
