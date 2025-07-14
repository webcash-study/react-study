import { useEffect } from "react";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./store/todoSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <Layout>
      <Title />
      <Controls />
      <TodoList />
    </Layout>
  );
}

export default App;
