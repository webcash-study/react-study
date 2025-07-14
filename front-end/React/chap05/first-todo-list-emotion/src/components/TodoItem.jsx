import { useContext, useState } from "react";
import { TodoContext } from "../context";
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../reducer";
import styled from "@emotion/styled";

function TodoItem({ id, text, completed }) {
  const { state, dispatch } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    dispatch({ type: UPDATE_TODO, payload: { id, text: e.target.value } });
  };
  const handleToggle = () => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };
  const handleDelete = () => {
    dispatch({ type: DELETE_TODO, payload: id });
  };
  return (
    <Item>
      <Checkbox type="checkbox" checked={completed} onChange={handleToggle} />
      {edit ? (
        <Input value={text} onChange={handleChange} />
      ) : (
        <Text completed={completed}>{text}</Text>
      )}
      <Button onClick={handleEdit}>수정</Button>
      <Button onClick={handleDelete}>삭제</Button>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  gap: 12px;
  padding: 0 12px;
`;
const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;
const Input = styled.input`
  flex-grow: 1;
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 20px;
  color: white;
`;
const Text = styled.p`
  flex-grow: 1;
  ${(props) => props.completed && `text-decoration: line-through;`}
`;
const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: black;
  color: white;
  border: none;
`;

export default TodoItem;
