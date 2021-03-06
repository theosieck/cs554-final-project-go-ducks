const { ObjectId } = require('mongodb');

const inputChecks = {
  checkString(str, varName, whiteSpcAllowed) {
    if (!str || arguments.length < 3)
      throw `Please provide a value for ${varName}.`;
    if (typeof str !== 'string') throw `${varName} must be a string.`;
    str = str.trim();
    if (str === '') throw `${varName} must contain at least one character.`;
    if (!whiteSpcAllowed && str.match(/[   ]/))
      throw `${varName} cannot contain any whitespace characters`;
    return str;
  },
  checkBool(bool, varName) {
    if (bool === undefined || bool === null || arguments.length < 2)
      throw `Please provide a value for ${varName}.`;
    if (typeof bool !== 'boolean') throw `${varName} must be a boolean`;
    return 'success';
  },
  checkObjId(objId, varName) {
    if (!objId || arguments.length < 2)
      throw `Please provide a value for ${varName}`;
    try {
      if (objId !== ObjectId(objId).toString())
        throw `${varName} must be an ObjectId`;
    } catch (e) {
      throw e.toString();
    }
  },
  checkNum(num, varName) {
    if (num === undefined || num === null || arguments.length < 2)
      throw `Please provide a value for ${varName}`;
    if (typeof num !== 'number' || isNaN(num))
      throw `${varName} must be a number`;
    return 'success';
  },
  checkEmail(email, varName) {
    //regex gotten from http://zparacha.com/validate-email-address-using-javascript-regular-expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(email)) {
      return email;
    } else {
      throw `${varName}: ${email} is an invalid email`;
    }
  },
  checkArray(array, varName) {
    if (!array || arguments.length<2) throw `Please provide a value for ${varName}`;
    if (!Array.isArray(array)) throw `${varName} must be an array.`;
  }
};

module.exports = inputChecks;
