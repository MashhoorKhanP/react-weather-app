import { Route, Routes } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="home" element={<HomeScreen />} />
      <Route path="login" element={<HomeScreen />} />
    </Routes>
  );
};

export default UserRouter;
