const db = require('../config/db');
const app = require('../server')
const { createUser } = require('../controllers/signup')
const request = require('supertest');
const User = require('../models/Users');


beforeAll(async () => await db.connect())
afterAll(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())




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

    it("It should test the ",async()=>{
        const res = await request(app)
        .post('/api/users/signup')
        .send({
            name: "Kartik",
            email: "kartik19@navgurukul.org",
            password: "12"
        });
            expect(res.statusCode).toBe(400);

    })


    it('it should create a new user',async()=>{
        let req = {
            body:{
                "name":"sonu",
                "email":"sonu19@navgurukul.org",
                "password":"111111111",
                "isAdmin":true
            }
        }
        let res = {
            statusCode:0,
        }

        try{
            const resTo = await createUser(req,res)
            // console.log("message ",res)

            expect(resTo.statusCode).toBe(200)
        }
        catch(err){
            console.log(err)
        }
    })

    it('It should validate if data is inserted',async()=>{
        const userFromDb = await User.findOne({email:"sonu19@navgurukul.org"})
        expect(userFromDb.name).toBe("sonu")
    })
    
})