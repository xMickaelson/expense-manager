const express = require("express");
require("dotenv").config();
const db = require("./db/index");

const app = express();
const PORT = 5000;
app.listen(PORT, () => {
  `Server is listening on PORT: ${PORT}`;
});
