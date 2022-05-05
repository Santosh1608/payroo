import React from "react";
import moment from "moment";
import { GoLocation } from "react-icons/go";
export const ConfirmationCard = ({
  hotel,
  confirmHandler,
  date,
  setModalOpen,
  isBookable = true,
}) => {
  return (
    <div className="book-module">
      <div className="inner">
        <div className="top">
          <img className="Image_Overlay" src={hotel?.image} />
          <div className="inner">
            <div className="logo-container">
              <h3>{hotel?.name}</h3>
              <p>{hotel?.location}</p>
              <button onClick={confirmHandler} className="btn">
                Confirm
              </button>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="inner">
            <div className="localAndHours">
              <div>
                <span className="Date">
                  {isBookable ? "Booking Date" : "Booked Date"}
                </span>
                <span>{moment(new Date(date)).format("MMMM Do, YYYY")}</span>
              </div>

              <div>
                <GoLocation className="Location" />
                <span>{hotel?.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
