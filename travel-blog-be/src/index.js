const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const routes = require("./routes");

const app = express();
dotenv.config();
db.connect();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
routes(app);
app.listen(process.env.PORT, () => {});
