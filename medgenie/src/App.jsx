import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Pages/Hero'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import ChangePassword from './Pages/ChangePassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import { useRef } from 'react';
import PageNotFound from './Pages/PageNotFound';
import Doctors from './Pages/Doctors';
import DiagnosesPage from './Pages/DiagnosesPage';
import ForgotPassword from './Pages/ForgotPassword';
import VoiceRecorder from './Components/VoiceRecorder';
import Admin from './Pages/Admin';
import AdminUser from './Pages/AdminUser'
import AdminAudio from './Pages/AdminAudio'
function App() {
  const HomeSection = useRef(null);
  const AboutSection = useRef(null);
  const ServicesPageSection = useRef(null);
  const WhyChooseUsSection = useRef(null);
  const CarousalPageSection = useRef(null);
  const ConnectWithUsSection = useRef(null);
  const FooterSection = useRef(null);
  const jwt = sessionStorage.getItem('jwt');
  const encryptedData=sessionStorage.getItem('encryptedData');
  return (
    <div >
    
      <Navbar message={"login successful"}
        AboutSection={AboutSection}
        HomeSection={HomeSection}
        ServicesPageSection={ServicesPageSection}
        WhyChooseUsSection={WhyChooseUsSection}
        CarousalPageSection={CarousalPageSection}
        ConnectWithUsSection={ConnectWithUsSection}
        FooterSection={FooterSection}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        <Route path='/'
          element={
            <Hero
              AboutSection={AboutSection}
              HomeSection={HomeSection}
              ServicesPageSection={ServicesPageSection}
              WhyChooseUsSection={WhyChooseUsSection}
              CarousalPageSection={CarousalPageSection}
              ConnectWithUsSection={ConnectWithUsSection}
              FooterSection={FooterSection}
            />} />
        <Route path='/hospitals' element={<Doctors />} />
        <Route path='/diagnoses' element={<DiagnosesPage />} />
        <Route path='/forgetPassword' element={<ForgotPassword/>} />
        {!jwt && <Route path='/login' element={<LoginPage />} />}
        {!jwt && <Route path='/signup' element={<SignUpPage />} />}
        {encryptedData && <Route path='/changePass' element={<ChangePassword />} />}

        <Route path='*' element={<PageNotFound />} />
        <Route path="/admin-dashboard" element= {<Admin/>}/>
        <Route path="/admin-users"  element={<AdminUser/>} />
        <Route path="/admin-audio" element={<AdminAudio/>} />
      </Routes>

      <VoiceRecorder />

    </div>
  )
}

export default App;