const db = require('../config/db');
const app = require('../server')
const { createUser } = require('../controllers/signup')
// const request = require('supertest');
const User = require('../models/Users');


beforeAll(async () => await db.connect())
afterAll(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())



describe("Test suite for user signup",()=>{
    
    it('it should create a new user',async()=>{
        expect(createUser).toBe("created")
        // const res = await request(app)
        // .post('/api/users').send({
        //     name:'sonu',
        //     email:"sonu19@navgurukul.org",
        //     password:"12312312"
        // })
        // expect(res.statusCode).toBe(200)
    })

        it('It should validate if data is inserted',async()=>{
       const userFromDb = await User.findOne({email:"sonu19@navgurukul.org"})
       expect(userFromDb.name).toBe("sonu")
    })
    
})