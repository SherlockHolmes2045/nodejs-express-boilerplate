const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const demandeurSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true
      },
      solde:{
        type: Number,
        required: true,
        default: 0  
      },
      successfull_searches:{
        type: Number,
        required: true,
        default: 0  
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
        private: true, // used by the toJSON plugin
      },
      packs:{
          type: Array,
          required: true,
          default: []
      },
    },
    {
      timestamps: true,
    }
  );

  demandeurSchema.plugin(toJSON);
  demandeurSchema.plugin(paginate);

  demandeurSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };

  demandeurSchema.pre('save', async function (next) {
    const demandeur = this;
    if (demandeur.isModified('password')) {
      demandeur.password = await bcrypt.hash(demandeur.password, 8);
    }
    next();
  });
/**
 * @typedef Demandeur
 */
const Demandeur = mongoose.model('Demandeur', demandeurSchema);

module.exports = Demandeur
