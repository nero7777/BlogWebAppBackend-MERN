require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//getting the routes exported in routes folder
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")

//middlewares
app.use(cors());
app.use(bodyParser.json());

//Connection to Database
mongoose.connect(process.env.DATABASE , {
    useNewUrlParser : true ,
    useUnifiedTopology : true ,
    useCreateIndex : true
}).then(() => {
    console.log("DB CONNECTED")
});

app.use('/api',userRoutes);
//For Ex : http://loalhost:8000/api/userRoute
app.use('/api',authRoutes);
//For Ex : http://loalhost:8000/api/authRoutes


//app listening on port.
app.listen( process.env.PORT || 8000, () => {
 console.log(`App is up and running on port ${process.env.PORT}`)
})