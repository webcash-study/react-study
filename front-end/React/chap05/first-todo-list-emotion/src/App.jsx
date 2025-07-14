import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context";

// import styled from "@emotion/styled";

// const size = "10px";
// const Component = styled.div`
//   color: lime;
//   background-color: ${(props) => props.bg};
//   font-size: ${size};
// `; // Tagged Template Literal

// function tag(strings, ...values) {
//   console.log(strings, values);
//   return strings.reduce((result, str, i) => {
//     const v = values[i] ? `<b>${values[i]}</b>` : "";
//     return result + str + v;
//   }, "");
// }

// const name = "Alice";
// console.log(tag`Hello world ${name}`);

function App() {
  return (
    <TodoProvider>
      {/* <Component bg="yellow">Hello world!</Component> */}
      <Layout>
        <Title />
        <Controls />
        <TodoList />
      </Layout>
    </TodoProvider>
  );
}

export default App;
