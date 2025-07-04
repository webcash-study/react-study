import { useContext } from "react";
import { createContext } from "react";

// Provider 설정하면 null 무시
const MyContext = createContext(null);

// Provider 설정
export const MyProvider = ({ children }) => {
  const value = { data: "hello world" };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const MyComponent = () => {
  const context = useContext(MyContext);
  return <div>{context.data}</div>;
};
