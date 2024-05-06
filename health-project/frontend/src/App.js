import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import StaffScreen from "./screens/StaffScreen"
import LoginScreen from "./screens/LoginScreeen"
import RegisterScreen from "./screens/RegisterScreen"
import PreAppointScren from "./screens/PreAppointScreen"
import OrderScreen from "./screens/OrderScreen"
import StaOrderListScreen from "./screens/StaOrderListScreen"
import EditOrderScreen from "./screens/EditOrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProfileScreen from "./screens/ProfileScreen"
import MedicalScreen from "./screens/MedicalScreen"
import Medicalhistory from "./screens/Medicalhistroy"
import StaffMedical from "./screens/StaffMedical"
import UserOrderlist from "./screens/UserOrderlist"



function App () {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path="/staffs/:id" element={<StaffScreen />} />
            <Route path="/preappointment/:id" element={<PreAppointScren />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path="/users/medicalhistory/:id" element={<Medicalhistory />} />
            <Route path="/staffs/medicalhistory/:id" element={<StaffMedical />} />
            <Route path='/orders/:id?' element={<OrderScreen />} />
            <Route path="/staffs/orders/:id" element={<StaOrderListScreen />} />
            <Route path="/users/orders/:id" element={<UserOrderlist />} />
            <Route path="/staffs/orders/:id/edit" element={<EditOrderScreen />} />
            <Route path="/staffs/orders/:id/check" element={<MedicalScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
