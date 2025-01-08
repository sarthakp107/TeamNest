//styles
import './App.css';

//routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="container">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='*' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/projects/:id' element={<Project/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
