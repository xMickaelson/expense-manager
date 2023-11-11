import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AppLayout from "./layout/AppLayout"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="dashboard" element={<AppLayout/>}>
          <Route path="expenses" element={<>Expenses</>}></Route>
          <Route path="wallet" element={<>Wallet</>}></Route>
          <Route path="account" element={<>Accounts</>}></Route>
        </Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
    </Routes>
  )
}

export default App
