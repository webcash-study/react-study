import { useContext } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { TodoContext } from "../context";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";

function TodoList() {
  const { state, dispatch } = useContext(TodoContext);

  const completedCount = state.list.filter((item) => item.completed).length;
  const handleToggleAll = (e) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: e.target.checked });
  };
  const handleDeleteCompleted = (e) => {
    dispatch({ type: DELETE_TODO_COMPLETED });
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

  const isAllCompleted =
    filteredList.length > 0 && filteredList.every((item) => item.completed);
  return (
    <div className="todo-list">
      <div className="todo-header">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className="todo-header-text">할 일</p>
        {completedCount > 0 && (
          <button
            className="todo-header-button"
            onClick={handleDeleteCompleted}
          >
            {completedCount}개 선택 삭제
          </button>
        )}
      </div>
      <div>
        {filteredList.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
