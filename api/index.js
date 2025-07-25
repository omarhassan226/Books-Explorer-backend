const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../src/configs/db");
const bookRoutes = require("../src/routes/book.routes");

const serverless = require("serverless-http");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);

module.exports.handler = serverless(app);
