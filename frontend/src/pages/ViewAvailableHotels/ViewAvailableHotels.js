import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  view_available_hotels,
  book_hotel,
} from "../../features/hotel/hotelSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "../../constants/Alert";
import { createAlert } from "../../helpers/createAlert";
import { Modal } from "../../components/Modal/Modal";
import styleClasses from "./ViewAvailableHotels.module.css";
import { Card } from "../../components/Card/Card";
import { ConfirmationCard } from "../../components/ConfirmationCard/ConfirmationCard";
import { Loader } from "../../components/Loader/Loader";
import moment from "moment";

function ShowHotels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_available_hotels, loading } = useSelector((state) => state.hotel);
  const { searchDate } = useParams();

  // Setting component state
  const [bookingHotel, setBookingHotel] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  //Fetching available hotels on change of search date in url param
  useEffect(() => {
    const viewAllAvailableHotels = async () => {
      try {
        await dispatch(view_available_hotels(searchDate)).unwrap();
      } catch (error) {
        createAlert({ alert: error, type: Alert.ERROR });
        navigate("/");
      }
    };
    viewAllAvailableHotels();
  }, [searchDate]);

  // Handlers
  const bookHotelHandler = async (hotel) => {
    setBookingHotel(hotel);
    setModalOpen(true);
  };

  const confirmBookingHandler = async () => {
    try {
      setModalOpen(false);
      await dispatch(
        book_hotel({ hotelId: bookingHotel.id, bookingDate: searchDate })
      ).unwrap();
      createAlert({
        alert: [{ success: "Booking Created" }],
        type: Alert.SUCCESS,
      });
      return navigate("/booking_history");
    } catch (error) {
      console.error(error);
      createAlert({ alert: error, type: Alert.ERROR });
    }
  };

  const available_hotels = all_available_hotels.map((hotel) => (
    <Card key={hotel.id} hotel={hotel} bookHotelHandler={bookHotelHandler} />
  ));

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <ConfirmationCard
          hotel={bookingHotel}
          date={searchDate}
          confirmHandler={confirmBookingHandler}
          setModalOpen={setModalOpen}
          isBookable
        />
      </Modal>
      {available_hotels.length > 0 ? (
        <div className={styleClasses.CardWrapper}>{available_hotels}</div>
      ) : (
        <div style={{ textAlign: "center" }}>
          No Available Hotels Found on{" "}
          {moment(searchDate).format("MMMM Do, YYYY")}
        </div>
      )}
    </div>
  );
}

export default ShowHotels;
