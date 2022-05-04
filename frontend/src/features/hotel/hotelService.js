import axiosInstance from "../../api/axiosInstance";
const API_URL = "/api/hotel";

// Get all hotels
const view_all_hotels = async () => {
  const response = await axiosInstance.get(`${API_URL}/view_all_hotels`);
  return response.data;
};

// View available hotels be providing search Date
const view_available_hotels = async (searchDate) => {
  searchDate = new Date(searchDate);
  const response = await axiosInstance.post(
    `${API_URL}/view_available_hotels_on_particular_date`,
    {
      searchDate: new Date(
        Date.UTC(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate()
        )
      ),
    }
  );
  return response.data;
};

//View booking history
const view_booking_history = async () => {
  const response = await axiosInstance.get(`${API_URL}/booking_history`);
  return response.data;
};

// Book the hotel by providing hotelId and booking date
const book_hotel = async ({ hotelId, bookingDate }) => {
  bookingDate = new Date(bookingDate);
  const response = await axiosInstance.post(
    `${API_URL}/book_hotel/${hotelId}`,
    {
      bookingDate: new Date(
        Date.UTC(
          bookingDate.getFullYear(),
          bookingDate.getMonth(),
          bookingDate.getDate()
        )
      ),
    }
  );
  return response.data;
};

// Cancel booking
const cancel_booking = async (bookingId) => {
  const response = await axiosInstance.delete(
    `${API_URL}/cancel_hotel_booking/${bookingId}`
  );
  return response.data;
};

const hotelService = {
  view_all_hotels,
  view_available_hotels,
  view_booking_history,
  book_hotel,
  cancel_booking,
};

export default hotelService;
