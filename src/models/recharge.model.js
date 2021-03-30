const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rechargeSchema = mongoose.Schema(
    {
        sender_id:{
            type:  mongoose.Schema.Types.ObjectId,
            ref: "Demandeur",
            required: true,
            trim: true,
        },
        amount:{
            type: Number,
            required: true,
            trim: true,
        },
        source:{
            type: String,
            required: true,
            trim: true,
        },
        successfull:{
            type: Boolean,
            required: true,
            trim: true,
            default: false
        },
        operation_id:{
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef Recharge
 */
 const Recharge = mongoose.model('Recharge', rechargeSchema);

 module.exports = Recharge;
 