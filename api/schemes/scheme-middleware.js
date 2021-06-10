// const schemes = require('./scheme-model')
const db = require('../../data/db-config')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params

  try {
    // const scheme = await schemes.findById(scheme_id)
    const scheme = await db('schemes').where('scheme_id', scheme_id).first()
    if(!scheme) {
      next({status: 404, message: `scheme with scheme_id ${scheme_id} not found`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

// const checkSchemeId = (req, res, next) => {
//   const { scheme_id } = req.params;
//   schemes.findById(scheme_id)
//     .then(scheme => {
//       if (!scheme) {
//         next({ status: 404, message: `scheme with scheme_id ${scheme_id} not found` });
//       } else {
//         next();
//       }
//     })
//     .catch(next);
// };


/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  // if(!req.body.scheme_name || req.body.scheme_name === "undefined") {
  if(!scheme_name || typeof(scheme_name) !== 'string' || scheme_name === 'undefined'){  
    next({status: 400, message: 'invalid scheme_name'})
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number} = req.body
  if(!instructions || typeof instructions !== 'string' || instructions === undefined || typeof step_number !== 'number' || step_number < 1) {
    next({status: 400, message: 'invalid step'})
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
