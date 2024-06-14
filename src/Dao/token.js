const jwt = require("jsonwebtoken")
require('dotenv').config()


const tokenFunctions = {
  getPersoneelsNummerFromToken: (token, callback) => {
    try {
      // Decode the token

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(token)
      // Extract userId from the decoded payload
      const userId = decoded.id
      console.log(userId)

      return callback(null, userId)
    } catch (error) {
      // If token is invalid or expired, return null
      console.log(error)
      return callback(error, null)
    }
  },

  createToken: (userId) => {
    const token = jwt.sign(
      { id: userId }, process.env.JWT_KEY, { expiresIn: "5s" })
    return token
  },
}
module.exports = tokenFunctions