function Form({}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const text = event.target.elements.user.value;
    alert(text);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user" />
      <button>submit</button>
    </form>
  );
}

export default Form;
