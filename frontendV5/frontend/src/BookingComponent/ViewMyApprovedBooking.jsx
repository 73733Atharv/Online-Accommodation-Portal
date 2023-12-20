import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const ViewMyApprovedBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [no,setNo]=useState(1);
  const [paymentStatus,setPaymentStatus] = useState({bid:0,status:"unpaid"});
 

  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  // useEffect(() => {
  //   no=no+1;
  //   setNo(no)
  // }, [no]);

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
      
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/hotel/fetch?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const paymentAlert= (id) => {
    var res=null;
    debugger;
    axios.get(
      "http://localhost:8080/api/book/hotel/fetch/booking?bookingId=" + id
    ).then((response) => {
      debugger;
       res=response.data;
    debugger;
            if (res.paymentStatus != "paid") {
              alert("payment done");
              // Update the payment status on the server side
              axios.post("http://localhost:8080/api/book/hotel/update/paymentstatus", {
                bookingId: id,
                paymentStatus: "paid"
              })
                .then((updateResponse) => {
                  console.log("Payment status updated:", updateResponse.data);
                var ele=document.getElementById("id");
               
                  // Update the payment status on the client side
                  setAllBookings((prevBookings) =>
                  prevBookings.map((booking) =>
                    booking.bookingId === id
                      ? { ...booking, paymentStatus: "paid" }
                      : booking
                  )
                );
                })
                .catch((error) => {
                  console.error("Error updating payment status:", error);
                });
                setPaymentStatus({bid:id,status:"paid"});
                console.log(id);
                console.log(paymentStatus.bid);
     }
  
    }
    )
  }
; 
const sortedBookings = allBookings.sort((a, b) => b.id - a.id);
//const no=1;
  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>My Bookings</h2>
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
                  <th scope="col">Hotel Email</th>
                  <th scope="col">Hotel Contact</th>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Check In</th>
                  <th scope="col">Check Out</th>
                  <th scope="col">Total Room</th>
                  <th scope="col">Total Day</th>
                  <th scope="col">Booking Status</th>
                  <th scope="col">Total Payable Amount</th>
                  <th scope="col" >Payment</th>
                </tr>
              </thead>
              <tbody>

                {sortedBookings.map((booking) => {
                    if(booking.status=="Approved"){
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/hotel/" +
                            booking.hotelImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>

                      <td>
                        <b>{booking.hotelName}</b>
                      </td>
                      <td>
                        <b>{booking.hotelEmail}</b>
                      </td>
                      <td>
                        <b>{booking.hotelContact}</b>
                      </td>

                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                      <td>
                        <b>{booking.customerName}</b>
                      </td>
                      <td>
                        <b>{booking.customerContact}</b>
                      </td>

                      <td>
                        <b>{booking.checkIn}</b>
                      </td>
                      <td>
                        <b>{booking.checkOut}</b>
                      </td>
                      <td>
                        <b>{booking.totalRoom}</b>
                      </td>

                      <td>
                        <b>{booking.totalDay}</b>
                      </td>
                      <td>
                        <b>{booking.status}</b>
                      </td>
                      <td>
                        <b>{booking.totalAmount}</b>
                      </td>
                      <td>
                      <button
                        onClick={() => paymentAlert(booking.bookingId)} // Pass the actual booking ID here
                        disabled={booking.paymentStatus == "paid" || booking.status == "Pending" || booking.status == "Cancel"} // Disable button if payment is already done
                      >{ 
                         booking.paymentStatus == "paid" ? "Paid" : "Pay Now"
                      }
                      </button>
                      </td>
                    </tr>
                  );}
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyApprovedBooking;