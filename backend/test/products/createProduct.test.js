const mongoose = require("mongoose");
import app from "../../server"
import connectDB from "../../config/db"
const request =require('supertest')

jest.setTimeout(60000);

describe('Create product',()=>{
    beforeAll(async()=>{
        await connectDB()
    })

    afterAll(async ()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    afterEach(()=>{
        app.close();
    })

    it('Should create product in database', async()=>{
        const {body, statusCode}=await request(app).post('/api/products')
        expect(statusCode).toBe(200)
        
    })
})