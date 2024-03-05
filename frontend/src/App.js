import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout'  />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>

      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
