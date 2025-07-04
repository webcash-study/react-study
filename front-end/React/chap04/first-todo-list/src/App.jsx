import { useEffect, useReducer, useRef, useState } from "react";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODO_COMPLETED,
  SET_FILTER,
  TOGGLE_TODO,
  TOGGLE_TODO_ALL,
  UPDATE_TODO,
  init,
  initialState,
  reducer,
} from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    window.localStorage.setItem("TODO", JSON.stringify(state.list));
    window.localStorage.setItem("ID", JSON.stringify(state.id));
  }, [state]);

  const handleChangeFilterType = (type) => {
    dispatch({ type: SET_FILTER, payload: type });
  };

  const handleSubmit = (value) => {
    dispatch({ type: ADD_TODO, payload: value });
  };

  const handleToggle = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  const handleToggleAll = (flag) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: flag });
  };

  const handleDelete = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const handleDeleteCompleted = () => {
    dispatch({ type: DELETE_TODO_COMPLETED });
  };

  const handleUpdate = (id, text) => {
    dispatch({
      type: UPDATE_TODO,
      payload: {
        id,
        text,
      },
    });
  };

  const filteredList = state.list.filter((item) => {
    switch (state.filterType) {
      case "TODO":
        return !item.completed;
      case "COMPLETED":
        return item.completed;
      default:
        return true;
    }
  });

  return (
    <div>
      <Layout>
        <Title />
        <Controls
          filterType={state.filterType}
          onChangeFilterType={handleChangeFilterType}
          onSubmit={handleSubmit}
        />
        <TodoList
          data={filteredList}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          onDelete={handleDelete}
          onDeleteCompleted={handleDeleteCompleted}
          onUpdate={handleUpdate}
        />
      </Layout>
    </div>
  );
}

export default App;
