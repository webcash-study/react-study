export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const TOGGLE_TODO_ALL = "TOGGLE_TODO_ALL";
export const DELETE_TODO_COMPLETED = "DELETE_TODO_COMPLETED";
export const SET_FILTER = "SET_FILTER";

export const init = () => {
  const savedTodo = JSON.parse(window.localStorage.getItem("TODO") || []);
  const savedID = JSON.parse(window.localStorage.getItem("ID") || 0);
  return {
    list: savedTodo,
    id: savedID ? Number(savedID) : 0,
    filterType: "ALL",
  };
};

export const initialState = {
  list: [],
  id: 0,
  filterType: "ALL",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: state.list.concat({
          id: state.id + 1,
          text: action.payload,
          completed: false,
        }),
        id: state.id + 1,
      };
    case UPDATE_TODO:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, text: action.payload.text };
          }
          return item;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload) {
            return { ...item, completed: !item.completed };
          }
          return item;
        }),
      };
    case TOGGLE_TODO_ALL:
      return {
        ...state,
        list: state.list.map((item) => ({
          ...item,
          completed: action.payload,
        })),
      };
    case DELETE_TODO_COMPLETED:
      return {
        ...state,
        list: state.list.filter((item) => !item.completed),
      };
    case SET_FILTER:
      return {
        ...state,
        filterType: action.payload,
      };
    default:
      return state;
  }
};
