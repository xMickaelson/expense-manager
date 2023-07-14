const express = require("express");
const figlet = require("figlet");
const morgan = require("morgan");

const db = require("./db");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT;

// morgan for giving you logs when user hits a endpoint
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * All routes accessible at /api endpoint
 */
app.use("/api", routes);

/**
 * Starting server after database connection is successfull
 */
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    // figlet to make ur console look good
    figlet("Expense Manager", (_, res) => console.log(res));
  });
}).catch((err) => {
  console.log("Error Connecting to Database", err);
});
