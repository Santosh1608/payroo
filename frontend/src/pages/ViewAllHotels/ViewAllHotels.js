import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/Card/Card";
import { Loader } from "../../components/Loader/Loader";
import { Alert } from "../../constants/Alert";
import { view_all_hotels } from "../../features/hotel/hotelSlice";
import { createAlert } from "../../helpers/createAlert";
import styleClasses from "./ViewAllHotels.module.css";

function ShowHotels() {
  const dispatch = useDispatch();
  const { all_hotels, loading } = useSelector((state) => state.hotel);

  useEffect(() => {
    const viewAllHotels = async () => {
      try {
        await dispatch(view_all_hotels()).unwrap();
      } catch (error) {
        createAlert({ alert: error, type: Alert.ERROR });
      }
    };
    viewAllHotels();
  }, []);

  const hotels = all_hotels.map((hotel) => (
    <Card key={hotel.id} hotel={hotel} />
  ));

  if (loading) {
    return <Loader />;
  }

  return <div className={styleClasses.CardWrapper}>{hotels}</div>;
}

export default ShowHotels;
