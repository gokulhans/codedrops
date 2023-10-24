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

function App() {
  // const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <div className='dark:bg-gray-900 dark:text-gray-50'>
        <Navbar isAuth={isAuth} />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot_password" element={<Forgot />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Home isAuth={isAuth} />} />
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
