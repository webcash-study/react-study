import { useContext, useState } from "react";
import styles from "./Controls.module.css";
import { TodoContext } from "../context";
import { ADD_TODO, SET_FILTER } from "../reducer";

function Controls() {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    dispatch({ type: ADD_TODO, payload: text });
    setText("");
  };
  const handleChangeFilterType = (e) => {
    dispatch({ type: SET_FILTER, payload: e.target.value });
  };
  return (
    <div className={styles.controls}>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={handleSubmit}>
        추가
      </button>
      <select
        name="select"
        className={styles.select}
        value={state.filterType}
        onChange={handleChangeFilterType}
      >
        <option value="ALL">전체</option>
        <option value="TODO">할 일</option>
        <option value="COMPLETED">완료</option>
      </select>
    </div>
  );
}
export default Controls;
