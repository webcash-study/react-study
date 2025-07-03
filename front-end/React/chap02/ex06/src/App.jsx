import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      State: {count}
      <button
        onClick={() => {
          // 0 > 1 > 2 > 3
          setCount(count + 1); // 1
          setTimeout(() => {
            // 0
            alert(count); // 1
          }, 1000);
        }}
      >
        update
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      {/* State: {count}
      <button onClick={handleUpdate}>Update</button> */}
      <Counter />
    </div>
  );
}

export default App;
