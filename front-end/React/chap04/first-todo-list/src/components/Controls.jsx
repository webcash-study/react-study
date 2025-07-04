import { useState } from "react";
import "./Controls.css";

function Controls({ onSubmit, filterType, onChangeFilterType }) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit(text);
    setText("");
  };

  return (
    <div className="controls">
      <input
        type="text"
        className="input"
        value={text}
        onChange={handleChange}
      />
      <button className="button" onClick={handleSubmit}>
        추가
      </button>
      <select
        name="select"
        className="select"
        value={filterType}
        onChange={(e) => onChangeFilterType(e.target.value)}
      >
        <option value="ALL">전체</option>
        <option value="TODO">할 일</option>
        <option value="COMPLETED">완료</option>
      </select>
    </div>
  );
}
export default Controls;
