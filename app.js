const express = require("express");
const dotenv = require("dotenv");

/** ------------------------------ */
/** CONFIG ENV VARIABLES */
/** ------------------------------ */
dotenv.config();
require("./DB/index");

const authRouter = require("./routes/auth.router");

/** ------------------------------ */
/** START THE APP AFTER LOADING ENV VARIABLES */
/** ------------------------------ */
const app = express();

/** ------------------------------ */
/** GLOBAL MIDDLEWARES */
/** ------------------------------ */
app.use(express.json());

/** ------------------------------ */
/** ROUTES */
/** ------------------------------ */

app.use("/api/v1/auth", authRouter);

/** ------------------------------ */
/** SERVER RUNNING */
/** ------------------------------ */
app.listen(process.env.PORT, () => {
  console.log(`Server is listening to requests at port ${process.env.PORT}`);
});
