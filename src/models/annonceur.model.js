const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const annonceurSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
          },
          profile_pic:{
              type: String,
              required: true,
              trim: true
          },
          birthday: {
              type: String,
              required:true,
              trim: true,
          },
          phone: {
            type: String,
            required: true,
            unique: true
          },
          competences:{
              type: Array,
              required: true,
              default: []
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
        },
        {
            timestamps: true,
        }
    );
    annonceurSchema.plugin(toJSON);
    annonceurSchema.plugin(paginate);

    annonceurSchema.methods.isPasswordMatch = async function (password) {
        const user = this;
        return bcrypt.compare(password, user.password);
      };
    
      annonceurSchema.pre('save', async function (next) {
        const annonceur = this;
        if (annonceur.isModified('password')) {
          annonceur.password = await bcrypt.hash(annonceur.password, 8);
        }
        next();
      });
    /**
     * @typedef Annonceur
     */
    const Annonceur = mongoose.model('Annonceur', annonceurSchema);
    
    module.exports = Annonceur