import React, {useState} from "react";
import Navbar from "./Navbar";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);


  const hideNavbar = 
  location.pathname === "/admin-dashboard" ||
  location.pathname === "/b2b-dashboard" ||
  location.pathname ===  '/user-dashboard' || 
  location.pathname === "/chatbot" || 
  location.pathname === "/admin-login" || 
  location.pathname === "/signup" || 
  location.pathname === "/b2b-auth" || 
  location.pathname === "/user-auth"



  const hideFooter = location.pathname === '/admin-dashboard' ||
  location.pathname === "/b2b-dashboard" || location.pathname === "/user-dashboard" ||
  location.pathname === "/chatbot" ||
  location.pathname === "/admin-login" || 
  location.pathname === "/signup" || 
  location.pathname === "/b2b-auth" || 
  location.pathname === "/user-auth"


  return (
    <>
    
      {!hideNavbar && <Navbar show={show} setShow={setShow}/> }
      <Outlet />

      {show && <Signup setShow={setShow} />}
      
      {!hideFooter && <Footer />}
      
      
    </>
  );
};

export default Layout;