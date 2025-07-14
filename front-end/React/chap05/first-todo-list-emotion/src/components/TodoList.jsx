import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";
import styled from "@emotion/styled";

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
    <List>
      <Header>
        <Checkbox
          type="checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <Text>할 일</Text>
        {completedCount > 0 && (
          <Button onClick={handleDeleteCompleted}>
            {completedCount}개 선택 삭제
          </Button>
        )}
      </Header>
      <div>
        {filteredList.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
    </List>
  );
}

const List = styled.div`
  border: 1px solid gray;
  border-radius: 6px;
  margin-top: 16px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  gap: 12px;
`;
const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;
const Text = styled.p`
  flex-grow: 1;
`;
const Button = styled.button`
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 0 12px;
  color: white;
  flex-shrink: 0;
  height: 30px;
`;

export default TodoList;
