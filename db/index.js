const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })


/**
 * db here is a promise, so exporting that
 */
module.exports = connection