const mongoose=require('mongoose')

const busSchema = new mongoose.Schema({
    busName: {
        type: String,
        required:true
    },
    agency:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'agencies'
    },
    vehicleNo: {
        type: String,
        unique: true,
        required: true
    },
    seats: [[{
        type: String,
    }]],
    busType: {
        type: String,
        enum:['Ac', 'NonAc'],
        default : 'Ac',
    },
    seatCategory:{
        type: String,
        enum : ['sleeper', 'semi sleeper'],
		default : 'sleeper',
        required:true
    },
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staffs'
        },
    helper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staffs'
        },
    policy: {
        type: String,
        required:true
    },
    images:[{
			type: String
	}],
    from:{ // index
			type:mongoose.Schema.Types.ObjectId,
			ref:'Location',
			index:true,
    },
    to:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Location',
			index : true
	   },
   arrivalTime: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    }
 
},{ 
    timestamps: true
   })
const Bus = mongoose.model('Buses', busSchema)
module.exports = Bus
