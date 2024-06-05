const jwt = require("jsonwebtoken")
require('dotenv').config()


const tokenFunctions = {
  getPersoneelsNummerFromToken: (token) => {
    try {
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_KEY)

      // Extract userId from the decoded payload
      const userId = decoded.id

      return userId
    } catch (error) {
      // If token is invalid or expired, return null
      return null
    }
  },

  createToken: (userId) => {
    const token = jwt.sign(
      { id: userId }, process.env.JWT_KEY, { expiresIn: "1h" })
    return token
  },
}
module.exports = tokenFunctions