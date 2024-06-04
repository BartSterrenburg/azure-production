const mysql = require('mysql2')
require('dotenv').config()


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "project",
  password: "mypass"
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err)
    return
  }
  console.log(`Connected to database.`)
})

module.exports = connection