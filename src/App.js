import React, {Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.css";  
import {Route, Routes ,Navigate} from "react-router-dom";
import Navbar from './component/Navbar';
import Movies from './component/Movie';
// import RegisterForm from './component/RegisterForm';
// import LoginForm from './component/LoginForm';
import MovieForm from './component/MovieForm';
import Customers from './component/Customers';
import Rentals from './component/Rentals';
import Page404 from './component/Page404';

class App extends Component {
  render() { 
    return (
      
       <React.Fragment>
        <Navbar />
     
      <Routes >
        {/* <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} /> */}
        <Route path='/movies/:id' element={<MovieForm />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path="/" element={<Navigate to={'/movies'} />}  />
        <Route path='/*' element={<Page404 />} />
      </Routes>
      </React.Fragment>
    );
  }
}
 
export default App;
