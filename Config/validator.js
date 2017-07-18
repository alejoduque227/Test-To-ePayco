const Validator = require('validatorjs');
const validations = require('validator');

/**
 *
 * @param data
 * @param rules
 * @param next
 */
function validate(data, rules, next) {
  const validation = new Validator(data, rules);

  validation.fails(() => {
    const errors = validation.errors.errors;
    const key = Object.keys(errors)[0];
    const error = new Error(validation.errors.first(key));
    error.status = http.codes['Unprocessable Entity'];
    error.errors = errors;
    return next(error);
  });

  validation.passes(() => {
    next();
  });
}

Validator.registerAsync('float', (data, attribute, req, passes) => {
  if (!validations.isFloat(data.toString())) {
    return passes(false);
  }
  return passes();
});


Validator.registerAsync('min_version', (data, attribute, req, passes) => {
  if (!validations.isFloat(data.toString())) {
    return passes(false);
  }
  if (data !== env.driver_version) {
    return passes(false);
  }
  return passes();
});

module.exports = {
  validate,
};
