import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Basic() {
  useEffect(() => {
    console.log("mount");
  }, []); // 의존성 배열이 비어있으면 마운트(mount)될 때 첫 번째 함수가 호출된다.
  return <div>Hello world</div>;
}

function Update(props) {
  const [state, setState] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    console.log("update", state);
  }, [ref.current]); // state가 업데이트되면 함수가 호출된다.
  return (
    <div>
      <h1>state: {state}</h1>
      <button onClick={() => (ref.current += 1)}>Click</button>
    </div>
  );
}

function CleanUp() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((pre) => pre + 1);
    }, 1000);

    return () => {
      console.log("clean");
      clearInterval(timerId);
    };
  }, []);
  return <div>Seconds: {seconds}</div>;
}

function App() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <Basic />
      <Update />
      {isShow && <CleanUp />}
      <button onClick={() => setIsShow((pre) => !pre)}>Click</button>
    </div>
  );
}

export default App;
