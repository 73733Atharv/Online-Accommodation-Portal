import { Link } from "react-router-dom";
import logo from "../images/e_logo.png";
import RoleNav from "./RoleNav";
import { useState } from "react";

const Header = () => {
  // const[username,setUserName]=useState("");
  // const retrieveAllBooking = async () => {
  //   const response = await axios.get(
  //     "http://localhost:8080/api/book/hotel/fetch?userId=" + user.id
  //   );
  //   console.log(response.data);
  //   return response.data;
  // };
  // useEffect(() => {
  //   const getAllBooking = async () => {
  //     const allBooking = await retrieveAllBooking();
  //     if (allBooking) {
  //       setAllBookings(allBooking.bookings);
  //     }
      
  //   };

  //   getAllBooking();
  // }, []);
  let userfname = sessionStorage.getItem("username");
  //let userlname = sessionStorage.getItem("userlastname");
  console.log("below");
  
  return (
    <div>
      <nav className="navbar  navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          />
          <Link to="/" className="navbar-brand">
            <i>
              <b className="text-color">Nivas</b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">About Us</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">Contact Us</b>
                </Link>
              </li>
              
            </ul>

            <RoleNav />
           <ul>
           <p className="nav-item">
                <Link
                  to="*"
                  className="nav-link active"
                  aria-current="page"
                >
                 
                  <b className="text-color">{(userfname ? "Welcome " + userfname : "")  }</b>
                </Link>
              </p>
           </ul>
            
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
