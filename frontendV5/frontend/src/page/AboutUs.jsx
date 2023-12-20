const AboutUs = () => {
  return (
    <div className="text-color ms-5 me-5 mr-5 mt-3">
      <b>
      The web based Online Accommodation Portal project is an attempt to stimulate the basic concepts of property booking system. There are 3 types of roles in our project as Admin, Property-Owner, Customer. Admin can add Locations, Facilities and approve properties added by property owner. Admin can  view all booking details. Property-Owner can add  properties on the location provided by admin & customers can book those approved properties. System provides quick search facility that provides details about property without login . If user wants to book property then user must login first. System allows customer to search  properties available in different cities, for a particular tenure. System displays all the property details such as rent, location, etc. To book a property, the system asks the customer to enter their details. Customer bookings can be approve or cancel by property owner. All 3 users can see booking status for a particular property. Customer can add review for properties.
      </b>
        <br />
    </div>
  );
};

export default AboutUs;
