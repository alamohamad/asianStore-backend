const { body } = require('express-validator');

const address = body('address')
  .notEmpty().withMessage('The address is required');
  
const phone_number = body('phone_number')
  .notEmpty().withMessage('The phone number is required');

const createOrdersValidation = [address, phone_number];

module.exports = { createOrdersValidation };
