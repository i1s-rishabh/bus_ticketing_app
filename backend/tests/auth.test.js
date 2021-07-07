const auth = require('../middlewares/auth')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
    

}

describe("Test suite for auth midleware",()=>{

    it('when token not found, shoud call with status 400',async()=>{
        
        let req = {}
        req.header = (input)=>{if(input==='x-auth-token') return ""}

        const res = mockResponse()
    
        await auth(req,res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalled()
    })

    it('when token is invalid, shoud call with status 401',async()=>{
        
        let req = {}
        req.header = (input)=>{if(input==='x-auth-token') return "BBBBBBBBBBBBBBBBBBB"}

        const res = mockResponse()
    
        await auth(req,res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalled()
    })


    it('when token invalid, shoud call with status 200',async()=>{
        const next = jest.fn()
        let req = {}
        req.header = (input)=>{if(input==='x-auth-token') return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNTNlYTVlNGQyMDEwMjFjYWY5OGQ1IiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE2MjU2NDkxMjUsImV4cCI6MTYyNTY4OTEyNX0.MTZBxlyWGowbYY8UNnX3XxrUHKHZF7gCMeA1SZZ0kiw"}
        req.user = (input)=>{ return req }

        const res = mockResponse()
    
        await auth(req,res,next)
        expect(next).toHaveBeenCalled()
    })

});