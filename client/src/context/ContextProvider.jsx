import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
