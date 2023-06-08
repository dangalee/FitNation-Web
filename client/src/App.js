import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {

  return (

    <div className = 'container'>
      <Router>
      <Routes>
        <Route path = '/' element = {<Login/>} />
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
      </Router>
    </div>
  

  );

}

export default App;
