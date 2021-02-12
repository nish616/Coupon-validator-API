const router = require("express").Router();
const Coupon = require("../models/coupon");


router.post("/createCoupon" , async (req,res) => {
    try {
    const {name, isActive, start, end, isPercent, minAmount, maxAmount , description} = req.body;

    const newCoupon = {
        name : name,
        isActive : isActive,
        start : start,
        end : end,
        isPercent : isPercent,
        minAmount : minAmount,
        maxAmount : maxAmount,
        description : description
    };

    const coupon = new Coupon(newCoupon);
    await coupon.save();
    res.status(201).json({"message" : "Coupon Created!"});
} catch(err){
    res.status(400).json({"message" : err.message});
}
});


module.exports = router;