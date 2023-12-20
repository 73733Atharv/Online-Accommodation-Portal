package com.hotelmanagement.dto;

import lombok.Data;


public class UpdatePaymentStatus {
	public String bookingId;
	public String paymentStatus;
	
	public String getBookingId() {
		return bookingId;
	}
	
	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}
	
	public String getPaymentStatus() {
		return paymentStatus;
	}
	
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

}
