const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

const app = express();

const folder=path.join(__dirname,"public")
app.use((express.static(folder)))


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/roomHotel')
.then(() => {
    console.log('MongoDB connected successfully.');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const db =mongoose.connection;

const bookingSchema = new mongoose.Schema({
    roomType: {
      type: String,
      enum: ['single', 'double', 'suite'],
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/ // Basic email validation
    },
    phone: {
      type: String,
      required: true
    }
  });

  const hroom =new mongoose.model("hroom",bookingSchema)


  app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
  app.get('/roombooing',(req,res)=>{
    res.sendFile('roombooking.html')
})




  app.get('/get',async(req,res)=>{
    try{
    const{roomType,checkInDate,checkOutDate,name,email,phone}= req.query
    const room=new hroom({
        roomType:roomType,
        checkInDate:checkInDate,
        checkOutDate:checkOutDate,
        name:name,
        email:email,
        phone:phone

    })
    await room.save()
    console.log(name)
    res.send("From submitted successfully")
         }catch (err) {
            console.error('Error processing booking:', err);
            res.status(500).send('Error booking the room.');
        }
        
  })





// Start Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
