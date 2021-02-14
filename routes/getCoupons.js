const router = require("express").Router();
const Coupon = require("../models/coupon");


router.get("/getCoupons" , async (req,res) => {
   try{

    const coupons = await Coupon.aggregate([
        {$project : {_id : 0 , name : 1, description : 1, end : 1}}
    ]);

    res.status(200).send(coupons);

   } catch(err) {
       if(err) res.status(400).json({"message" : "failed"});
   }
});

module.exports = router;