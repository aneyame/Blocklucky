import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { AdminRoute } from "./components/AdminRoute"
import { Home } from "./pages/Home"
import { Participate } from "./pages/Participate"
import { Admin } from "./pages/Admin"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/participate" 
            element={
              <ProtectedRoute>
                <Participate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}