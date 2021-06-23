/* 

* Will contain custom auth middleware 
* that checks for JWT from the user

* For testing purposes, this always returns "true"

*/

const isAuthorized = (credentials) => {
  /* Will accept an email address and a token */

  // 1. Compare email to our list of authorized users
  // 2. Compare token using something like bcrypt 
  // 3. If both are correct, return true
  // 4. If either is incorrect, return an appropriate error message

  // For testing purposes only, return true: 
  return true;
}

module.exports = isAuthorized;