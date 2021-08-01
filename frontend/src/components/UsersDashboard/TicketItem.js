import React from "react";
import PropTypes from "prop-types";
import { deleteTicket } from "../../actions/bookSeats";
import { connect } from "react-redux";


const TicketItem = ({ticket:{_id,passengers,seats_no,journeyDate,from,to,busId:{vehicleNo,departureTime}}, deleteTicket}) => {
  let travelDate = new Date(journeyDate);
  const month = travelDate.toLocaleString("default", { month: "short" });
  const date = travelDate.getDate();
  const year = travelDate.getFullYear();
  let today = new Date().toISOString().slice(0, 10)

  return (
    <div class="row bg-warning rounded mb-3">
      <div class="col-auto bg-primary rounded"></div>
      <div class="col">
        <h3>BUS TICKET</h3>
        <div class="form-row ml-1 mr-1 pl-2 pr-2 bg-primary rounded align-items-center mb-3">
          <p class="text-white m-0">
            <strong>BOARDING PASS</strong>
          </p>
        </div>
        <div class="form-row pb-4">
          <div class="col">
            <h6>Passengers</h6>
            {passengers.map((passenger,index) => (
                <h6>
                <strong>
                  {passenger.name} - {seats_no[index]}
                </strong>
              </h6>
              ))}
              
          </div>
          <div class="col">
            <h6 class="bus">Bus</h6>
            <h6 class="bus_no">
              <strong>{vehicleNo}</strong>
            </h6>
          </div>
          <div class="col">
            <h6 class="date">Date</h6>
            <p class="date_of_ticket">
              <strong>{date} {month} {year}</strong>
            </p>
          </div>
        </div>
        <div class="form-row pb-4">
          <div>
            <h6 class="from">from</h6>
            <p class="from_locations">
              <strong>{from}</strong>
            </p>
          </div>
        </div>
        <div class="form-row pb-4">
          <div>
            <h6 class="to">to</h6>
            <p class="to_locations">
              <strong>{to}</strong>
            </p>
          </div>
        </div>
        <div class="form-row align-items-center justify-content-center pb-2">
          <div>
            <h6 class="time">boarding time</h6>
            <h2 class="boarding_time text-danger mt-0">
              <strong>{departureTime}</strong>
            </h2>
          </div>
        </div>
      </div>
      <div class="col-auto d-flex align-items-center">
        <div>
          {journeyDate>today && (<button type="button" class="btn btn-danger" onClick={e=>deleteTicket(_id)}>
            <strong>Cancel Ticket</strong>
          </button>)}
          
        </div>
      </div>
    </div>
  );
};

TicketItem.propTypes = {
  deleteTicket:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{deleteTicket})(TicketItem);
