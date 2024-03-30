import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Home from "./pages/home"

import {BrowserRouter,Routes,Route} from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/login" element={<AdminLogin/>}/>
      <Route path="*" element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
}