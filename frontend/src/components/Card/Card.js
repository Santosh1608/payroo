import React from "react";
import styleClasses from "./Card.module.css";
export const Card = ({ hotel, bookHotelHandler = null }) => {
  return (
    <div className={styleClasses.Card}>
      <h1>{hotel.location}</h1>
      <img className={`${styleClasses.Image}`} src={hotel.image} />
      <div className={styleClasses.Details}>
        <h2>{hotel.name}</h2>
        <p>3 Days - 2 Nights</p>
        <h2 className={styleClasses.Price}>&#x20b9;{hotel.price}</h2>
      </div>
      {bookHotelHandler && (
        <button
          className="custom-btn-move"
          onClick={() => bookHotelHandler(hotel)}
        >
          <span>Book Now</span>
        </button>
      )}
    </div>
  );
};
