const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//import DB connection
require("./DB/dbConfig");

//import routes
const createCoupon = require("./routes/createCoupon");
const getCoupon = require("./routes/getCoupons");
const validateCoupon = require("./routes/validateCoupon");

const app = express();


app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

//Route middleware
app.use("/admin/", createCoupon);
app.use("/store/", getCoupon);
app.use("/checkout/",validateCoupon);

app.listen(3000, console.log("Server up and running!"));