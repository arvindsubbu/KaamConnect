const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    consumerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    providerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    serviceCategory : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    paymentStatus : {
       type : String,
       enum : ['pending','paid','failed'],
       default : 'pending',
    },
    status : {
        type : String,
        enum : ['pending','accepted','in-progress','completed','cancelled'],
        default : 'pending',
    },
    scheduledDate : Date,
    completedAt : Date,
    review : {
        rating : {type : Number,min : 1,max : 5},
        comment : String,
        createdAt : Date,
    }

},{timestamps : true});

const workModel = mongoose.model('Work',workSchema);
module.exports = workModel;