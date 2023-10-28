import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Forgot from './pages/Forgot_Password/Forgot_Password';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AddDrop from './pages/Drop/AddDrop/AddDrop';
import Drops from './pages/Drop/Drops/Drops';
import ViewDrop from './pages/Drop/ViewDrop/ViewDrop';
import EditDrop from './pages/Drop/EditDrop/EditDrop';
import Profile from './pages/Profile/Profile';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <>
      <div className='dark:bg-gray-900 dark:text-gray-50'>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route path="/signin" element={<SignIn setIsAuth={setIsAuth} />} />
                <Route path="/signup" element={<SignUp setIsAuth={setIsAuth} />} />
                <Route path="/forgot_password" element={<Forgot />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Home isAuth={isAuth} />} />
                <Route path="/drop/add" element={<AddDrop isAuth={isAuth} />} />
                <Route path="/drop/edit/:id" element={<EditDrop isAuth={isAuth} />} />
                <Route path="/drops" element={<Drops isAuth={isAuth} />} />
                <Route path="/drop/:id/:title" element={<ViewDrop isAuth={isAuth} />} />
                <Route path="/profile/:id/:user" element={<Profile isAuth={isAuth} />} />
                <Route path="*" element={<Error isAuth={isAuth} />} />
              </>
            )}
          </Routes>
        </div>
        <Footer isAuth={isAuth} />
      </div>
    </>
  )
}

export default App
