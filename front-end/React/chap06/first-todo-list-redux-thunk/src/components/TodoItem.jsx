import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";

const itemClassName = `
  flex items-center h-[65px] gap-[12px] px-[12px] py-[0px]
`;

const checkboxClassName = `w-[16px] h-[16px]`;

const textClassName = `grow`;

const buttonClassName = `bg-black text-white border-none`;

const inputClassName = `
  grow border-[1px] border-solid border-gray-500 rounded-[6px]
  bg-transparent px-[12px] py-[4px] text-[14px] leading-[20px] text-white
`;

function TodoItem({ id, text, completed }) {
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(text);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    if (edit) {
      dispatch(updateTodo({ id, text: newText }));
    }
    setEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    setNewText(e.target.value);
  };
  const handleToggle = () => {
    dispatch(toggleTodo({ id, completed: !completed }));
  };
  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };
  return (
    <div className={itemClassName}>
      <input
        className={checkboxClassName}
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      {edit ? (
        <input
          className={inputClassName}
          value={newText}
          onChange={handleChange}
        />
      ) : (
        <p
          className={[textClassName, completed && "line-through"].join(" ")}
          completed={completed}
        >
          {text}
        </p>
      )}
      <button className={buttonClassName} onClick={handleEdit}>
        수정
      </button>
      <button className={buttonClassName} onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
