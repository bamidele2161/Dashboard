import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/addUser' element={<AddUser />} exact />
            <Route path='/editUser/:id' element={<EditUser />} exact />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
