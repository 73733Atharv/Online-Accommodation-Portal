package com.hotelmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelmanagement.dao.HotelDao;
import com.hotelmanagement.entity.Hotel;
import com.hotelmanagement.entity.Location;
import com.hotelmanagement.utility.Constants.BookingStatus;

@Service
public class HotelService {

	@Autowired
	private HotelDao hotelDao;

	public Hotel addHotel(Hotel hotel) {
		return hotelDao.save(hotel);
	}
	
	public List<Hotel> fetchAllHotelsByStatus(String status) {
		return hotelDao.findByStatus(status);
	}
	
	public List<Hotel> fetchHotelsByLocationAndStatus(Location locationId, String status) {
		return hotelDao.findByLocationAndStatus(locationId, status);
	}
	
	public Hotel fetchHotel(int hotelId) {
		return hotelDao.findById(hotelId).get();
	}
	
	public List<Hotel> fetchHotelsByUserId(int userId) {
		return hotelDao.findByUserId(userId);
	}

}
