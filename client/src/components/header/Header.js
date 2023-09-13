import React, { useContext } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = React.useState("");
  const [openDate, setOpenDate] = React.useState(false);
  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = React.useState(false);
  const [options, setOptions] = React.useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleClickOption = (name, action) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: action === "+" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = React.useContext(SearchContext);
  const { user } = React.useContext(AuthContext);

  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "header-container listmode" : "header-container"
        }
      >
        <div className="header-list">
          <div className="header-list-item active">
            <FontAwesomeIcon icon={faBed} />
            <span> stays</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faPlane} />
            <span>flights</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faCar} />
            <span>car rentals</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faBed} />
            <span>attractions</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>airport taxi</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            {" "}
            <h1 className="header-title">
              {" "}
              welcome to the booking application
            </h1>
            <p className="header-description">
              instant discount of 10% on use of coupon code: BOOKFIRST
            </p>
            {!user && (
              <button className="header-button">Sign-in/Register</button>
            )}
            <div className="header-search">
              <div className="header-search-item">
                <FontAwesomeIcon icon={faBed} className="header-icon" />
                <input
                  type="text"
                  placeholder="destination"
                  className="header-search-input"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header-icon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="header-search-text"
                >{`${format(date[0].startDate, "dd/MM/yyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon icon={faPerson} className="header-icon" />
                <span
                  className="header-search-text"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {options.adult} adults. {options.children} children.
                  {options.room} room
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="option-item">
                      <span className="option-text">Adult</span>
                      <div className="option-counter">
                        <button
                          className="option-counter-button"
                          onClick={() => handleClickOption("adult", "+")}
                        >
                          +
                        </button>
                        <span className="option-counter-number">
                          {options.adult}
                        </span>
                        <button
                          disabled={options.adult <= 1}
                          className="option-counter-button"
                          onClick={() => handleClickOption("adult", "-")}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="option-item">
                      <span className="option-text">Children</span>
                      <div className="option-counter">
                        <button
                          className="option-counter-button"
                          onClick={() => handleClickOption("children", "+")}
                        >
                          +
                        </button>
                        <span className="option-counter-number">
                          {options.children}
                        </span>
                        <button
                          disabled={options.children <= 0}
                          className="option-counter-button"
                          onClick={() => handleClickOption("children", "-")}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="option-item">
                      <span className="option-text">Room</span>
                      <div className="option-counter">
                        <button
                          className="option-counter-button"
                          onClick={() => handleClickOption("room", "+")}
                        >
                          +
                        </button>
                        <span className="option-counter-number">
                          {options.room}
                        </span>
                        <button
                          disabled={options.room <= 1}
                          className="option-counter-button"
                          onClick={() => handleClickOption("room", "-")}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="header-search-item">
                <button className="header-button" onClick={handleSearch}>
                  search
                </button>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
