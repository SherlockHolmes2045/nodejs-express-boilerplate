const {check} = require('express-validator');


const userValidationRules = () => {
    return [
        // username must be an email
        check('username').isEmail(),
        // password must be at least 5 chars long
    check('password').isLength({ min: 5 }),
      ]
    }

module.exports = {
    userValidationRules,
}