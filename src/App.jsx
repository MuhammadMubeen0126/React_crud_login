import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Forgotpassword from './Pages/Forgotpassword';
import ResetPassword from './Pages/Resetpassword';
import Register from './Pages/Register';
function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' exact element={<Login />} />
          <Route path='forgotpassword' element={<Forgotpassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
