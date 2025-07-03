const Item = ({ isDone }) => {
  let text = "Todo";
  if (isDone) {
    text = "Done";
  }

  return <div>{isDone ? "Done" : "Todo"}</div>;
};

export default Item;
