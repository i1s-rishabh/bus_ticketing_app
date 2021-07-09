const db = require('../config/db');
const app = require('../server')
const { createUser } = require('../controllers/signup')
const request = require('supertest');
const User = require('../models/Users');
const {loginTests} = require('./login')
const { addLocationTests } = require('./addlocation')
const { adminjsTests } = require('./adminTests')
const { addStaffTests } = require('./addStaff')
const { bussesTests } = require('./busses')

beforeAll(async () => await db.connect())
afterAll(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res

}


  
jest.setTimeout(7000)

describe("Test suite for user signup",()=>{

    it("It should test the working of signup api",async()=>{
        const res = await request(app)
        .post('/api/users/signup')
        .send({
            name: "Kartik",
            email: "kartik19@navgurukul.org",
            password: "1212121212"
        });
            expect(res.statusCode).toBe(200);

    })


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
        expect(res.json).toHaveBeenCalled()
    })

    it("It should give 400 in response as user already exists",async()=>{
        let req = {
            body:{
                name:"sonu",
                email:"sonu19@navgurukul.org",
                password:"111111111",
                isAdmin:true
            }
        }

        const next = jest.fn()
        const res = mockResponse()

        await createUser(req,res,next)
        expect(next.mock.calls[0][0]).toEqual({status:400, error: { msg: "User already exists" } })
    })

    loginTests()

    addLocationTests()

    adminjsTests()

    addStaffTests()

    bussesTests()
})