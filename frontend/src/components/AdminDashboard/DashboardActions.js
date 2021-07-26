import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";


const DashboardActions = ({profile:{agencyName,phone,headOfficeLocation,createdAt,agent:{email}}}) => {
    let startedAt = createdAt.slice(0, 10);
    return (
    <div>
        <h2 className="agencyName">Agency Name: {agencyName}</h2>
        <h2 className="email">
            Email: {email}
        </h2>
        <h2 className="contact no.">
            Contact:{phone}
        </h2>
        <h2 className="Location">
            Office: {headOfficeLocation}
        </h2>
        <h2 className="StartedAt">Partner Since: {startedAt} </h2>
      <div className="dash-buttons mt-4">
        <button className="btn btn-danger">
           Delete
        </button>
        <Link to="/my-buses" className="btn btn-primary">
          <i className="fab fa-black-tie text-primary"></i> Buses
        </Link>
        <Link to="/my-staff" className="btn btn-primary">
          <i className="fas fa-graduation-cap text-primary"></i> Staffs
        </Link>
      </div>
    </div>
  );
};

DashboardActions.propTypes = {
    profile:PropTypes.object.isRequired,
}


export default DashboardActions