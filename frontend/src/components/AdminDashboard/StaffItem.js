import React from 'react'
import { connect } from 'react-redux'
import { deleteStaff } from '../../actions/staff'
import PropTypes from 'prop-types'


const StaffItem = ({staff:{_id,phone,name,address,isDriver},deleteStaff}) => {
    const removeStaff = ()=>{
        deleteStaff(_id)
    }
    return (
        <div className="row mb-4">
            <div className="card w-100">
            <div className="card-header d-flex flex-direction-column justify-content-between bg-warning">
                <div>
                <h4 className="Name"><strong> {name}</strong></h4>
            </div>
            <div>
                <h6 className="phone"><strong>{phone}</strong></h6>
            </div>
            <div>
                <h6 className="address"><strong>{address}</strong></h6>
            </div>
            <div>
                <h6 className="position"><strong>{isDriver ? "Driver": "Helper"}</strong></h6>
            </div>
            </div>
            <div className="card-body bg-primary">
                <button type="button" className="btn btn-danger" onClick={removeStaff}><strong>Remove Staff</strong></button>
            </div>
            </div>
        </div>
        )
}

StaffItem.propTypes = {
    deleteStaff:PropTypes.func.isRequired,
}


export default connect(null,{deleteStaff})(StaffItem)
