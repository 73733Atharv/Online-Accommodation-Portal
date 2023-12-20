package com.hotelmanagement.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hotelmanagement.dao.HotelFacilityDao;
import com.hotelmanagement.entity.Facility;
import com.hotelmanagement.entity.Hotel;
import com.hotelmanagement.entity.HotelFacility;
import com.hotelmanagement.entity.Location;

@Service
public class HotelFacilityService {
	
	@Autowired
	private HotelFacilityDao hotelFacilityDao;
	
	public List<HotelFacility> getHotelFacilitiesByHotelId(int hotelId) {
		return this.hotelFacilityDao.findByHotelId(hotelId);
	}
	
	public HotelFacility addFacility(HotelFacility hotelFacility) {
	    return this.hotelFacilityDao.save(hotelFacility);
	}

}
