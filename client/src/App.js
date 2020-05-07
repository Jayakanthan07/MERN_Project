import React from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Route exact path='/'>
    <Home/>
    </Route>
    <Route path ='/Signin' >
      <Signin/>
    </Route>
    <Route path ='/Profile' >
      <Profile />
    </Route>
    <Route path ='/Signup' >
      <Signup />
    </Route>


    </BrowserRouter>
    );
}

export default App;
