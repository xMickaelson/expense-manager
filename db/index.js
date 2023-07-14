const mongoose = require('mongoose')
require('dotenv').config()

const db = mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })


/**
 * db here is a promise, so exporting that
 */
module.exports = db