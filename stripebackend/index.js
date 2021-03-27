const express = require('express');
const cors = require('cors')
const stripe = require('stripe')("sk_test_51IR0W4CtjUChAj91zr34izbjuL5GBekXsRgS7deYy4BDGGKbnA8PPqY4SJhsWDXXsDFe06wMMz4V41yaKp266Iee00tfTMHkK3")
const uuid = require('uuid')
const PORT = process.env.PORT || 5000
const app = express()
require('dotenv').config()

//middlewares
app.use(express.json())
app.use(cors())
console.log(uuid.v4())
//routes
app.get('/', (req,res) =>{
    res.send("HELLO STRIPE BACKEND")
})

app.post('/payment', (req,res) => {

    const {product, token} = req.body;
    console.log('PRODUCT', product)
    console.log('PRICE', product.price)
    const idempontencyKey = uuid.v4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Pruchase of ${product.name}`,
            shipping:{
                name: token.card.name,
                address: {
                    country: token.card.country
                }
            }
        }, {idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})


// Listen 
app.listen(PORT, () =>{
    console.log(`Server is runnig on port ${PORT}`)
})