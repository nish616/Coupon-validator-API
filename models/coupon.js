const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },

    isActive : {
        type : Boolean,
        required : true
    },
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    isPercent : {
        type : Boolean,
        required : true
    },
    percent : {
        type : Number,
        required : false
    },
    minAmount : {
        type : Number,
        required : false
    },
    maxAmount : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : false
    }
});

//db.members.createIndex(db.members.createIndex( { "user_id": 1 }, { unique: true } ) );
//mongoose.Collection.createIndexes({ "name": 1 }, { unique: true } );
module.exports = new mongoose.model("Coupon" , couponSchema);