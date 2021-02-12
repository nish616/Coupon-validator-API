const router = require("express").Router();
const Coupon = require("../models/coupon");

router.post("/validateCoupon", async (req,res) => {
 try{
     let newCartTotal;

    const {couponName , cartTotal} = req.body;

    const date = new Date();

    const coupon = await Coupon.findOne({name : couponName});

    const { isActive, end, isPercent, percent, minAmount, maxAmount} = coupon;

    if(!isActive){
        return res.status(400).json({"message" : "Coupon expired!"});
    } else if(date > end){
        return res.status(400).json({"message" : "Coupon expired!"});
    } else if(cartTotal < minAmount){
        return res.status(400).json({"message" : `Cart total should have minimum ${minAmount}`});
    } else if(isPercent){
        newCartTotal = (cartTotal) * (percent/100);
        if(newCartTotal > maxAmount ){
           // newCartTotal = cartTotal - maxAmount;
            return res.status(200).json({"message" : "Coupon Applied!","Discount" : maxAmount});
        }else {
            //newCartTotal = cartTotal - newCartTotal;
            return res.status(200).json({"message" : "Coupon Applied!","Discount" : newCartTotal});
        }
    } else {
        newCartTotal = cartTotal - maxAmount;
        return res.status(200).json({"message" : "Coupon Applied!","Discount" : newCartTotal});
    }

 }catch(err){
    return res.status(400).send("Coupon invalid");
 }
});

module.exports = router;