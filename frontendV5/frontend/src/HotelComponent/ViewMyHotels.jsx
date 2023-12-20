import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ViewMyHotels = () => {
  let user = JSON.parse(sessionStorage.getItem("active-hotel"));

  const [updateHotelStatus, setUpdateHotelStatus] = useState({
    hotelId: "",
    status: "Cancel",
  });

  const [allHotels, setAllHotels] = useState([]);

  useEffect(() => {
    const getAllHotels = async () => {
      const allhotels = await retrieveAllHotels();
      if (allhotels) {
        setAllHotels(allhotels.hotels);
      }
    };

    getAllHotels();
  }, []);

  const retrieveAllHotels = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/hotel/fetch/myhotels?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const cancelHotel = (hotelId, e) => {
    updateHotelStatus.hotelId = hotelId;

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
              window.location.reload(true);
            }, 2000); // Redirect after 2 seconds
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
    <div className="mt-3">
      <div
        className="card form-card  mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>My Hotels</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Hotel</th>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Location</th>
                  <th scope="col">Email</th>
                  <th scope="col">Total Room</th>
                  <th scope="col">Address</th>
                  <th scope="col">Rent Per Day</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allHotels.map((hotel) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/hotel/" + hotel.image1
                          }
                          class="img-fluid"
                          alt="hotel_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>

                      <td>
                        <b>{hotel.name}</b>
                      </td>
                      <td>
                        <b>{hotel.description}</b>
                      </td>
                      <td>
                        <b>{hotel.location.city}</b>
                      </td>

                      <td>
                        <b>{hotel.emailId}</b>
                      </td>
                      <td>
                        <b>{hotel.totalRoom}</b>
                      </td>
                      <td>
                        <b>{hotel.street + " " + hotel.pincode}</b>
                      </td>

                      <td>
                        <b>{hotel.pricePerDay}</b>
                      </td>
                      <td>
                        <b>{hotel.status}</b>
                      </td>
                      <td>
                        {(() => {
                          if (hotel.status !== "Approved") {
                            return (
                              <button
                                onClick={() => cancelHotel(hotel.id)}
                                className="btn btn-sm bg-color custom-bg-text"
                              >
                                Cancel
                              </button>
                            );
                          }
                        })()}
                        <ToastContainer />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyHotels;
