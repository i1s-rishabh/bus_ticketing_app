const { validationResult } = require("express-validator");
const Location = require("../models/Locations");

const addLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { city, state } = req.body;
    try {
        let locations = await Location.find({ city });
        if(locations){
            let searchedCity = locations.forEach((location)=>{
                if(location.state === state){
                    return res
                        .status(400)
                        .json({ errors: [{ msg: "Location Already Exists" }] });
                }
            })
        }
        location = new Location({
            city,
            state,
        });
        await location.save();
        res.status(200).json({msg:"Location Added Succesfully!!"})
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
};

module.exports = {addLocation};