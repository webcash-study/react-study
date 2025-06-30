import { Fragment } from "react";

function HelloWorld() {
  return (
    <Fragment>
      <h1 className="">Hello world</h1>
      <h1>Hello world</h1>
    </Fragment>
  );
}

React.createElement("h1", null, "Hello world");

function Message() {
  const name = "Alice";
  return (
    <input type="input" maxLength={5} stlye={{ backgroundColor: "red" }} />
  );
}

// function Invalid() {
//   const flag = true
//   return <div>
//     {
//       if(flag) {
//         return <div>true</div>
//       } else {
//         return <div>false</div>
//       }
//     }
//   </div>
// }

function App() {
  return (
    <div>
      <hr />
      <HelloWorld />
      {/* <helloWorld /> */}
      <Message />
    </div>
  );
}

export default App;
