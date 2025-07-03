const Alert = ({ onAlert }) => {
  return (
    <div>
      {/* SyntheticEvent */}
      <button onClick={onAlert}>Click</button>
    </div>
  );
};

export default Alert;
