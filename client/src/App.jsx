import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/adminDashboard"
import Home from "./pages/home"

import {BrowserRoter,Routes,Route} from 'react-router-dom'

export default function App() {
  return (
    <BrowserRoter>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/login" element={<AdminLogin/>}/>
      <Route path="*" element={<Home/>} />
    </Routes>
    </BrowserRoter>
  )
}