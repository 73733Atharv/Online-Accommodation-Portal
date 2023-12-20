import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ApproveHotel = () => {
  const location = useLocation();
  const hotel = location.state;

  let navigate = useNavigate();

  var customerToken = sessionStorage.getItem("customer-jwtToken");
  const [bookingStatus, setBookingStatus] = useState([]);

  const [updateHotelStatus, setUpdateHotelStatus] = useState({
    hotelId: hotel.id,
    status: "",
  });

  const handleUserInput = (e) => {
    setUpdateHotelStatus({
      ...updateHotelStatus,
      [e.target.name]: e.target.value,
    });
  };

  const retrieveAllBookingStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/hotel/fetch/status"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllBookingStatus = async () => {
      const allBookingStatus = await retrieveAllBookingStatus();
      if (allBookingStatus) {
        setBookingStatus(allBookingStatus);
      }
    };

    getAllBookingStatus();
  }, []);

  const approveHotel = (e) => {
    fetch("http://localhost:8080/api/hotel/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateHotelStatus),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.responseCode === 0) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">Approve Hotel</h4>
          </div>
          <div className="card-body">
            <div className="d-flex aligns-items-center justify-content-center">
              <img
                src={"http://localhost:8080/api/hotel/" + hotel.image1}
                class="img-fluid"
                alt="hotel_pic"
                style={{
                  maxWidth: "180px",
                }}
              />
            </div>
            <form onSubmit={approveHotel} className="row g-3 mt-2">
              <div className="col-md-6 mb-3 text-color">
                <label for="totalSeat" class="form-label">
                  <b>Hotel Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={hotel.name}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label for="totalSeat" class="form-label">
                  <b>Location</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={hotel.location.city}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Select Status</b>
                </label>
                <select
                  name="status"
                  onChange={handleUserInput}
                  className="form-control"
                >
                  <option value="">Select Status</option>

                  {bookingStatus.map((status) => {
                    return <option value={status}> {status} </option>;
                  })}
                </select>
              </div>

              <button type="submit" className="btn bg-color custom-bg-text">
                Update Status
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveHotel;
