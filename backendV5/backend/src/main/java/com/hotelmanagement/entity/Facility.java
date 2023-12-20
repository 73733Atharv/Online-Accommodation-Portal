package com.hotelmanagement.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.beans.BeanUtils;

import com.hotelmanagement.dto.FacilityFetchResponse;

@Entity
public class Facility {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;
	
	@OneToMany
	private List<Hotel> hotels;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Hotel> getHotels() {
		return hotels;
	}

	public void setHotels(List<Hotel> hotels) {
		this.hotels = hotels;
	}

	public static FacilityFetchResponse toFacilityFetchResponse(Facility facility) {
		FacilityFetchResponse facilityFetchResponse = new FacilityFetchResponse();
		BeanUtils.copyProperties(facility, facilityFetchResponse);
		return facilityFetchResponse;
	}

}
