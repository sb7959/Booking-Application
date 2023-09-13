import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./list.css";
import React from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = React.useState(
    location.state.destination
  );
  console.log(destination);
  const [date, setDate] = React.useState(location.state.date);
  const [options, setOptions] = React.useState(location.state.options);
  const [openDate, setOpenDate] = React.useState(false);
  const [min, setMin] = React.useState(undefined);
  const [max, setMax] = React.useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:4000/api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }`
  );

  const handleSearch = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-title">Search</h1>
            <div className="list-item">
              <label>destination name</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="list-item">
              <label>checkin-date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "dd/MM/yyy"
              )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="list-item">
              <label>Options</label>

              <div className="list-option-item">
                <span className="list-option-text">
                  Min price <small>per night</small>
                </span>
                <input
                  type="number"
                  className="list-option-input"
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="list-option-item">
                <span className="list-option-text">
                  Max price <small>per night</small>
                </span>
                <input
                  type="number"
                  className="list-option-input"
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div className="list-option-item">
                <span className="list-option-text">Adult</span>
                <input
                  type="number"
                  className="list-option-input"
                  placeholder={options.adult}
                  min={1}
                />
              </div>
              <div className="list-option-item">
                <span className="list-option-text">Children</span>
                <input
                  type="number"
                  className="list-option-input"
                  placeholder={options.children}
                  min={0}
                />
              </div>
              <div className="list-option-item">
                <span className="list-option-text">Room</span>
                <input
                  type="number"
                  className="list-option-input"
                  placeholder={options.room}
                  min={1}
                />
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="list-result">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
