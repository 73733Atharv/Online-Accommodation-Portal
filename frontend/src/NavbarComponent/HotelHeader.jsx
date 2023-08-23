import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-hotel"));
  console.log(user);

  const hotelLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-hotel");

    navigate("/home");
    window.location.reload(true);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/admin/hotel/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Hotel</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="myhotels/all" className="nav-link active" aria-current="page">
          <b className="text-color">My Hotels</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="user/hotel/bookings/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Booked Hotel</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={hotelLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HotelHeader;
