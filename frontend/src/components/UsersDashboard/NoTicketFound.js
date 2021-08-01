import React from 'react'
import { Fragment } from 'react'
import travelFast from '../../img/travelFast.jpg'

const NoTicketFound = () => {
    return (
        <Fragment>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Book The Tickets</h5>
            <p class="card-text">Travel The World</p>
        </div>
        <img class="card-img-bottom" style={{height: "30rem"}} src={travelFast} alt="Card image cap" />
    </div>
        </Fragment>
        )
}

export default NoTicketFound
