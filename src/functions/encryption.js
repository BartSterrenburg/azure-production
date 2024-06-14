const bcrypt = require("bcrypt")

const encryptionFunctions = {
  encryptPassword: async (password) => {
    const salt = await bcrypt.genSalt(13)
    const hash = await bcrypt.hash(password, salt)
    return hash
  },

  comparePassword: async (password, hash) => {
    const match = await bcrypt.compare(password, hash)
    return match
  },
}

module.exports = encryptionFunctions