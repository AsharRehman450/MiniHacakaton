import './App.css';
import SignUp from './Component/SignUpForm';
import Login from './Component/LoginForm';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Component/Dashboard';
import AuthRoute from './Component/AuthRoute';
import ProtectedRoute from './Component/ProtectedRoute';
import LandingPg from './Component/LandingPage/LandingPg';


function App() {
  return (
    <>
      <Routes>


        <Route element={<AuthRoute/>}>
        <Route path="/" element={<LandingPg/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
    
      </Routes>

      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </>
  );
}

export default App;
