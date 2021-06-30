const db = require('../config/db');
const app = require('../server')
const { createUser } = require('../controllers/signup')
// const request = require('supertest');
const User = require('../models/Users');


beforeAll(async () => await db.connect())
afterAll(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())




describe("Test suite for user signup",()=>{

    let res;
    beforeEach(() => {
      res = {
        statusCode: 0,
        body: {},
        status: (code) => {
          res.statusCode = code;
          return res;
        },
        json: (result) => {
          res.body = result;
          return res;
        },
      }
    });
  


    it('it should create a new user',async(done)=>{
        let sampReqBody = {
            body:{
                "name":"sonu",
                "email":"sonu19@navgurukul.org",
                "password":"1111111111"
            }
        }
        createUser(sampReqBody,res).then(() => {
            console.log(res)
            expect(res.statusCode).toBe(200)
        })
        
    })

    //     it('It should validate if data is inserted',async()=>{
    //    const userFromDb = await User.findOne({email:"sonu19@navgurukul.org"})
    //    expect(userFromDb.name).toBe("sonu")
    // })
    
})