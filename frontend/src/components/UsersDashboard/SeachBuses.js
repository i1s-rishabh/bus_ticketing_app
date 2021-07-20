import React, { Fragment, useState } from "react";
import { searchbuses } from "../../actions/searchBuses";
import { connect } from "react-redux";
import propTypes from "prop-types";
import {useHistory } from "react-router-dom";

const SearchBuses = ({ searchbuses, loading }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  let history = useHistory()
  const { from, to, date } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let today = new Date().toISOString().slice(0, 10);
    console.log(today, "hello");
    if (date < today) {
      alert("Invalid Date");
      // setAlert('Invalid Date','danger')
    } else if (to === from) {
      alert("Please select the valid Departure and Destination");
    } else {

      // setting travel date in to location storage
      localStorage.setItem('travelDate',date)

      let day = new Date(date);
      day = day.getDay();

      const newData = {
        to,
        from,
        date: day,
      };
      searchbuses(newData)
      history.push('/getbuses')
    }
  };
  return (
    <Fragment>
      <div className="ticket my-5">
        <form className="form-row my-5 m-5" onSubmit={(e) => onSubmit(e)}>
          <div className="col">
            <input
              type="text"
              className="form-control "
              placeholder="     from"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
              className="form-control "
              placeholder="     to"
            />
          </div>
          <div className="col">
            <input
              type="Date"
              name="date"
              value={date}
              onChange={(e) => onChange(e)}
              className="form-control"
              placeholder="to"
            />
          </div>
          <div className="search_Tickets ">
            <button type="submit" className="btn btn-danger">
              Search
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

SearchBuses.propTypes = {
  searchbuses: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.searchBuses.loading,
});

export default connect(mapStateToProps, { searchbuses })(SearchBuses);
