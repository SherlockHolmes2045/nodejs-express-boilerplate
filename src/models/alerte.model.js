const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const alertSchema = mongoose.Schema(

    {
        demandeur_id:{
            type:  mongoose.Schema.Types.ObjectId,
            ref: "Demandeur",
            required: true,
            trim: true,
        },
        perimeter:{
            type: Number,
            required: true,
            trim: true,
        }, 
        category:{
            type:mongoose.Schema.Types.ObjectId,,
            ref: "Category",
            trim: true
        }
    },
    {
        timestamps: true,
    }
);


// add plugin that converts mongoose to json
alerteSchema.plugin(toJSON);
alerteSchema.plugin(paginate);

/**
 * @typedef Alerte
 */
 const Alerte = mongoose.model('Alerte', userSchema);

 module.exports = Alerte;
 