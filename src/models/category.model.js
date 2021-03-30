const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const categorySchema = mongoose.Schema(
    {
        label:{
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Category
 */
 const Category = mongoose.model('Category', categorySchema);

 module.exports = Category;