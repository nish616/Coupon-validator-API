const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");


//import DB connection
require("./DB/dbConfig");

//import routes
const createCoupon = require("./routes/createCoupon");
const getCoupons = require("./routes/getCoupons");
const validateCoupon = require("./routes/validateCoupon");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

//Route middleware
app.use("/admin/", createCoupon);
app.use("/store/", getCoupons);
app.use("/validate/",validateCoupon);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, console.log("Server up and running!"));