const { addLocation } = require('../controllers/addLocation');
const request = require('supertest');
const app = require('../server')


// const mockResponse = () => {
//     const res = {};
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     return res
// }


const addLocationTests = () => describe("Test suite addlocation.js file",()=>{
    console.log(3)
    it("It should test the working of addLocation api",async()=>{
        const res = await request(app)
        .post('/api/admins/admin/location')
        .send({
            "city":"Pink City",
            "state":"Rajasthan"
        });
        expect(res.status).toBe(200);
    })
})

module.exports = {addLocationTests}