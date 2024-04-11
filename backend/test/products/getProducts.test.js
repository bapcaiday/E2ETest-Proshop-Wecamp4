const mongoose = require("mongoose");
import app from "../../server"
import connectDB from "../../config/db"
const request =require('supertest')



jest.setTimeout(60000);

describe('Get all products',()=>{
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

    it('Should get all products in database', async()=>{
        const {body, statusCode}=await request(app).get('/api/products')
        expect(statusCode).toBe(200)
        expect(body.products).toBeInstanceOf(Array);
        expect(body.products.length).toBeGreaterThan(0);
        expect(body.products[0]).toHaveProperty('_id')
        expect(body.products[0]).toHaveProperty('name')
        expect(body.products[0]).toHaveProperty('countInStock')
        expect(body.products[0]).toHaveProperty('image')
        expect(body.products[0]).toHaveProperty('price')
    })
})

describe('Get product with id',()=>{
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


    it('Should get product in database', async()=>{
        const {body, statusCode}=await request(app).get(`/api/products/65f5725c47513446e015b699`)
        expect(statusCode).toBe(200)
        expect(body).toEqual(expect.any(Object))
        expect(body).toHaveProperty('_id')
        expect(body).toHaveProperty('name')
        expect(body._id).toBe('65f5725c47513446e015b699')
        expect(body.name).toBe('Airpods Wireless Bluetooth Headphones')
    })

    
    it('Should get send error message if id is invalid', async()=>{
        const {body, statusCode}=await request(app).get(`/api/products/65f5725c457513446e015b699`)
        expect(statusCode).toBe(404)
        expect(body.message).toBe('Product not found')
        
    })
})

describe('Get top products',()=>{
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


    it('Should return array of 3 products', async()=>{
        const {body, statusCode}=await request(app).get(`/api/products/top`)
        expect(statusCode).toBe(200)
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(3)
        expect(body[0].rating).toBe(9)
    })
})





