const db = require('../config/db');
const app = require('../server')
const { createUser } = require('../controllers/signup')
const request = require('supertest');
const User = require('../models/Users');
const sinon = require('sinon');


beforeAll(async () => await db.connect())
afterAll(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())



const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res

}
  


describe("Test suite for user signup",()=>{

    // it("It should test the working of signup api",async()=>{
    //     const res = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         name: "Kartik",
    //         email: "kartik19@navgurukul.org",
    //         password: "1212121212"
    //     });
    //         expect(res.statusCode).toBe(200);

    // })

    // it("It should give 400 in response as user already exists",async()=>{
    //     const res = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         name: "Kartik",
    //         email: "kartik19@navgurukul.org",
    //         password: "12"
    //     });
    //         expect(res.statusCode).toBe(400);

    // })


    it('it should create a new user',async()=>{
        let req = {
            body:{
                name:"sonu",
                email:"sonu19@navgurukul.org",
                password:"111111111",
                isAdmin:true
            }
        }

        const res = mockResponse()
        await createUser(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
    })

    // it('It should validate if data is inserted',async()=>{
    //     const userFromDb = await User.findOne({email:"sonu19@navgurukul.org"})
    //     expect(userFromDb.name).toBe("sonu")
    // })
    
})