export default function Form() {
  return (
    <>
      <form>
        <div className="email">
          <label htmlFor="email">email</label>
          <input type="text" id="email" />
        </div>
        <div className="password">
          <label htmlFor="password">password</label>
          <input type="text" id="password" />
        </div>
      </form>
    </>
  );
}
