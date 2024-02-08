import React, { useEffect, useReducer } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import UserRouter from "./UserRouter";
import { useValue } from "../context/ContextProvider";
import { toast } from "react-toastify";

const AppRouter = () => {
  const navigate = useNavigate();
  const {
    state: { currentUser },
  } = useValue();
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    } else {
      toast.info("Logged out successfully!");
    }
  }, [currentUser]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="/*" element={<UserRouter />} />
    </Routes>
  );
};

export default AppRouter;
