import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import Expenses from "./pages/dashboard/Expenses";
import Budgets from "./pages/dashboard/Budgets";
import Accounts from "./pages/dashboard/Accounts";
import Analysis from "./pages/dashboard/Analysis";
import Categories from "./pages/dashboard/Categories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="dashboard" element={<AppLayout />}>
        <Route index element={<Navigate to="expenses" />} />
        <Route path="expenses" element={<Expenses />}></Route>
        <Route path="budgets" element={<Budgets />}></Route>
        <Route path="accounts" element={<Accounts />}></Route>
        <Route path="analysis" element={<Analysis />}></Route>
        <Route path="categories" element={<Categories />}></Route>
      </Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
