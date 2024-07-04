import logo from './logo.svg';
import './App.css';
import { Component, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkToken } from './Toolkit/authSlice';
import { toast } from 'react-toastify';









const Header=lazy(()=>import('./Pages/Layout/Header/Header'))
const Login=lazy(()=>import('./Pages/Auth/Login/Login'))
const Registration=lazy(()=>import('./Pages/Auth/Registration/Registration'))
const Forgot=lazy(()=>import('./Pages/Auth/Forgot/Forgot'))
const UpdatePassword=lazy(()=>import('./Pages/Auth/UpdatePassword/UpdatePassword'))
const Home=lazy(()=>import('./Pages/CMS/Home/Home'))
const Product=lazy(()=>import('./Pages/CMS/Product/Product'))
const Create=lazy(()=>import('./Pages/CMS/Create/Create'))
const UpDate=lazy(()=>import('./Pages/CMS/UpDate/UpDate'))

function Private({children}) {
  const token=localStorage.getItem("token") || sessionStorage.getItem("token")
  return token!=null || token!=undefined?(children):(<>
   <Navigate to={"/"}/>
   {toast.error("Login First")}
  </>)
  
}

const publicRoutesName=[
  {
    path:"/",
    Component:<Login/>
  },{
    path:"/registration",
    Component:<Registration/>
  },{
    path:"/forgot",
    Component:<Forgot/>
  }
]
const privateRoutesNmae=[
  {
    path:"/update-password",
    Component:<UpdatePassword/>
  },{
    path:"/Home",
    Component:<Home/>
  },{
    path:"/Product",
    Component:<Product/>
  },{
    path:"/Create",
    Component:<Create/>
  },{
    path:"/Product/:id",
    Component:<UpDate/>
  }
]


function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkToken())
  },[dispatch])
  return (
  <Suspense fallback={<h1>Loading...</h1>}>
    <Router>
      <Header/>
      <Routes>
        {publicRoutesName.map((item)=>(
          <Route path={item.path} element={item.Component}/>
        ))}
        {
          privateRoutesNmae.map((item)=>(
            <Route path={item.path} element={<Private>{item.Component}</Private>}/>
          ))
        }

      </Routes>
    </Router>

  </Suspense>
  );
}

export default App;
