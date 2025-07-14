import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodo, setFilter } from "../store/todoSlice";
const inputClassName = `grow border-[1px] border-solid border-gray-500 rounded-[6px] bg-transparent
  px-[12px] py-[4px] text-[14px] leading-[20px] text-white;
  `;

const commonClassName = `
  border-[1px] border-solid border-gray-500 rounded-[6px]
  bg-transparent px-[12px] py-[0px] text-white;
  shrink
`;

function Controls() {
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(createTodo(text));
    setText("");
  };
  const handleChangeFilterType = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div className="flex gap-[6px] h-[30px]">
      <input
        className={inputClassName}
        type="text"
        value={text}
        onChange={handleChange}
      />
      <button className={commonClassName} onClick={handleSubmit}>
        추가
      </button>
      <select
        className={commonClassName}
        name="select"
        value={state.filterType}
        onChange={handleChangeFilterType}
      >
        <option className="text-black" value="ALL">
          전체
        </option>
        <option className="text-black" value="TODO">
          할 일
        </option>
        <option className="text-black" value="COMPLETED">
          완료
        </option>
      </select>
    </div>
  );
}

export default Controls;
