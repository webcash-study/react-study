function Propagation() {
  const handleParent = () => alert("parent");
  const handleChild = (event) => {
    event.stopPropagation();
    alert("child");
  };
  return (
    <div onClick={handleParent}>
      <button onClick={handleChild}>child</button>
    </div>
  );
}

export default Propagation;
