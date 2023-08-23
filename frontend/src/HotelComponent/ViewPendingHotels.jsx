import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewPendingHotels = () => {
  let user = JSON.parse(sessionStorage.getItem("active-hotel"));

  const [allHotels, setAllHotels] = useState([]);

  let navigate = useNavigate();

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
      "http://localhost:8080/api/hotel/fetch/pendingHotels"
    );
    console.log(response.data);
    return response.data;
  };

  const approveHotel = (hotel) => {
    navigate("/admin/hotel/approve", { state: hotel });
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
          <h2>Pending Hotels</h2>
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
                        <b>{hotel.location.name}</b>
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
                        <button
                          onClick={() => approveHotel(hotel)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          Approve
                        </button>
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

export default ViewPendingHotels;
