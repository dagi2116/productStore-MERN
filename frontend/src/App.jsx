import './App.css'
import { Routes, Route } from 'react-router-dom'
// 
import HomePage from './pages/HomePage'
import CreateProduct from './pages/CreateProduct'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#111] text-black dark:text-white">
        {/*  */}
        <Navbar />
        <ToastContainer position="top-right" autoClose={5000} />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreateProduct />} />
        </Routes>
      </div>
    </>
  )
}

export default App
