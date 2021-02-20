const router = require("express").Router();
const Coupon = require("../models/coupon");

router.post("/validateCoupon", async (req,res) => {
 try{
     let discount;
    const {couponName , cartTotal} = req.body;

    const date = new Date();

    const coupon = await Coupon.findOne({name : couponName});

    if(coupon == null){
        return res.status(404).json({"message" : "Coupon not found!" });
    }
    else {

        const { isActive, end, isPercent, percent, minAmount, maxAmount} = coupon;

        if(!isActive){
            return res.status(400).json({"message" : "Coupon expired!"});
        } else if(date > end){
            return res.status(400).json({"message" : "Coupon expired!"});
        } else if(cartTotal < minAmount){
            return res.status(400).json({"message" : `Cart total should have minimum ${minAmount}`});
        } else if(isPercent){
            discount = (cartTotal) * (percent/100);
            if(discount >= maxAmount ){
            // newCartTotal = cartTotal - maxAmount;
            discount = maxAmount;
                return res.status(200).json({"message" : "Coupon Applied!","Discount" : discount});
            }else {
                //newCartTotal = cartTotal - newCartTotal;
                return res.status(200).json({"message" : "Coupon Applied!","Discount" : discount});
            }
        } else {
            discount =  maxAmount;
            
            res.status(200).json({"message" : "Coupon Applied!","Discount" : discount});
        }

    }

    

 }catch(err){
    return res.status(400).send("Coupon invalid");
 }
});

module.exports = router;