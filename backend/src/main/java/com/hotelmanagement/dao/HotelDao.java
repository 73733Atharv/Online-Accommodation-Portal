package com.hotelmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.entity.Hotel;
import com.hotelmanagement.entity.Location;

@Repository
public interface HotelDao extends JpaRepository<Hotel, Integer> {
	
	List<Hotel> findByStatus(String status);
	List<Hotel> findByLocationAndStatus(Location locationId, String status);
	List<Hotel> findByUserId(int userId);
	
}
