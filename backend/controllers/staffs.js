const { check, validationResult } = require('express-validator')
const Agency = require('../models/Agency')
const Staffs = require('../models/Staffs')


const addStaff = async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, name, address,isDriver } = req.body;
    const staffData = {phone,name,address,isDriver};
    staffData.adminId = req.user.id;
    try{
        let agencyProfile = await Agency.findOne({ agent: req.user.id });
        if (agencyProfile){
        let staff = await Staffs.findOne({ phone: phone });
        if (staff) {
            return res.json({"msg":"This staff is already exists"});
          }
          staff = new Staffs({
              ...staffData
          })

          staff.save()
          res.status(200).json(staff);
        }else{
            return res.status(404).json({"msg":"No agency found of current admin"})
        }
    }catch(err){
        res.status(500).json({error:"server error"})
    }

}

module.exports = { addStaff }