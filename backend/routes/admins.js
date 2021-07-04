const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const { getAgency, createAgency } = require('../controllers/admins');
const {addBus} =require('../controllers/Buses')
const { addStaff } = require('../controllers/staffs');
const {addLocation} = require('../controllers/addLocation');
const Staff = require('../models/Staffs')
const { check, validationResult } = require('express-validator')


// Get @route api/admins/agency
// Get the current admin agency profile
// private route
router.get('/admin/profile', auth,isAdmin,getAgency );


// POST @route api/admins/agency
// create the current admin agency profile
// private route
router.post('/admin/addAgency', [auth,isAdmin, [
    check('phone', 'Phone number is required')
    .isLength({ min: 10 }),
    check('agencyName', 'Agency name is required')
        .not()
        .isEmpty(),
    check('headOfficeLocation', 'Location of the agency situated is required')
    .not()
    .isEmpty()
]], createAgency)



// POST /api/admins/admin/addLocation
router.post("/admin/location",[auth,isAdmin,
    [
        check("city", "City is required").not().isEmpty(),
        check("state", "State is required").not().isEmpty()
    ]],
    addLocation
);



// POST /api/admins/admin/newbus
// Create or Update a bus
// Private Route 
router.post('/admin/addBus',[auth,isAdmin, [
    check('busName', 'Bus name is required')
    .not()
    .isEmpty(),
    check('vehicleNo', 'vehicle number is required')
    .not()
    .isEmpty(),
    check('seats', 'Address of the staff is required')
    .isInt()
    .not()
    .isEmpty(),
    check('driver', 'driver should be inserted')
    .not()
    .isEmpty(),
    check('helper', 'helper should be inserted')
    .not()
    .isEmpty(),
    check('policy', 'policy should be inserted')
    .not()
    .isEmpty(),
    check('images', 'images of the should be inserted')
    .not()
    .isEmpty(),
    check('from', 'boarding point of the bus is required')
    .not()
    .isEmpty(),
    check('to', 'dropping point of the bus is required')
    .not()
    .isEmpty(),
    check('arrivalTime', 'arrivalTime of the bus is required')
    .not()
    .isEmpty(),
    check('departureTime', 'departureTime of the bus is required')
    .not()
    .isEmpty()
]],addBus)



// POST @route api/admins/:adminId/addStaff
router.post('/admin/addStaff',[auth,isAdmin, [
    check('phone', 'Phone number is required')
    .isInt()
    .isLength({ min: 10,max: 10 }),
    check('name', 'Agency name is required')
        .not()
        .isEmpty(),
    check('address', 'Address of the staff is required')
    .not()
    .isEmpty(),
    check('isDriver', 'Position is required')
    .isBoolean()
]],addStaff)


module.exports = router;
