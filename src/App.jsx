import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' exact element={<Login />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
