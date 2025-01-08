//styles
import './App.css';

//routes
import { BrowserRouter, Routes, Route, Navigate} from 'react-router';

//context
import { useAuthContext } from './hooks/useAuthContext';

//pages
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



function App() {
  const {authIsReady, user} = useAuthContext();
  return (
    <div className="App">
      {authIsReady && <BrowserRouter>
      <Sidebar/>
      <div className="container">
      <Navbar/>
        <Routes>
          <Route path='/' element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
          <Route path='*' element={<Dashboard/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
          <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>}/>
          <Route path='/create' element={user ? <Create/>: <Navigate to="/login"/>}/>
          <Route path='/projects/:id' element={user ? <Project/>: <Navigate to="/login"/>}/>
        </Routes>
      </div>
      </BrowserRouter>}
    </div>
  );
}

export default App;
