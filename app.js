const express = require("express");
require("dotenv").config();
const db = require("./db/connect");

const app = express();

//set up body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
