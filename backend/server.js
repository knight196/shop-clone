const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv')
const authRoutes = require("./routes/routesauth")
const addProduct = require('./Schema/addProduct')
const productRouter = require('./routes/productroutes')
const path = require('path')
const Userdashboard = require('./Userdashboard/Userorders')
const Admindashboard = require('./Admindashboard/AdminOrders')
const cloudinary = require('cloudinary').v2


const stripe = require('stripe')('sk_test_51KsUrvGU7oHqY8oq7q50HJ4iDdJDegsnT2A1w7UFCF57XEozOWjR2ZEHQdz852a1TSI3GqyvZcEkE6qC3yPgTKM700z8svM91i')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// Middlewares
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
// app.use(cors())


app.use('/api', productRouter)
app.use('/orders', Userdashboard)
app.use('/api/', Admindashboard)

// connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)

//cloudinary config
cloudinary.config({
 cloud_name:process.env.CLOUD_NAME,
 api_key: process.env.API_KEY,
 api_secret: process.env.API_SECRET
})


// API for PAYMENT

  app.get("/config", (req, res) => {
  res.send({
    publishableKey: 'pk_test_51LtvUXJI0em1KAyRvQVz8eLL2Q1Mva0cNgWH5jMqyLR4682taIOg8K56mJUei50MTl1iMvj37iGhfwlgRBJ39dEy00nhy5zi37'
  });
});

  
app.post("/payment/create", async (req, res) => {
  const {amount} = req.body
  try {

    const paymentIntent = await stripe.paymentIntents.create({    
      currency: "GBP",
      amount: amount * 100,
    });

    // Send publishable key and PaymentIntent details to client
    res.json({clientSecret: paymentIntent.client_secret});
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// cloudinary image upload 
app.post('/newproducts/add', async (req,res) => {

  try{
    
    let images = [...req.body.images];
    let imagesBuffer = [];
  
    for(let i =0; i<images.length; i++){
      const result = await cloudinary.uploader.upload(images[i], {
        folder:'listimages',
        width:1920,
        crop:'scale'
      })

      imagesBuffer.push({
        public_id:result.public_id,
        url:result.secure_url
      })

    }

    req.body.images = imagesBuffer


    const listproducts = await addProduct.create(req.body)

    res.status(201).json({
      success:true,
      listproducts
    })

  }catch (err){
    console.log(err)
  }

})



app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


// app.use('/', (req,res) => res.send('homepage'))

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
})