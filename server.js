const express = require("express");
const morgan = require("morgan");
const app = express()
const mongoose = require("mongoose");
require('dotenv').config();

/*       IMPORTANT! I HAVE MY DB SET UP FOR ALL IP ADRESSES FOR THIS TO WORK!!!!!!
                          || 
    FAILED ATTEMPTS!!!!!! \/
*/
// const connect = process.env.CONNECTION_STRING// WTF
// // console.log(process.env.CONNECTION_STRING) 
// // mongoose.connect(connect)

// const userName = encodeURIComponent(process.env.userName)
// const password = encodeURIComponent(process.env.password)
// const dbName = encodeURIComponent(process.env.dbName)

// const CONNECTION_STRING = encodeURIComponent()


// const uri = `mongodb://${userName}:${password}@localhost:27017/${dbName}`
// const app = express();


// middleware
app.use(express.json())
app.use(morgan("dev"))

// CONNECT
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(error))



// ROUTES
app.use("/api/bounties", require("./routes/bountyRouter.js"))

// error handling
app.use((err, req, res, next)=>{
    console.log(err)
    return res.send({errorMessage: err.message})
})

app.listen(8000, () => {
    console.log("server running on port 8000")
})