const express = require("express");
require("dotenv").config();
const connection = require("./Config/Connection");
const app = express();
const port = 8888;
const cors = require("cors");
app.use(cors(
    { origin: "*" })
);
app.use(express.json());




app.listen(8888,()=>{
    console.log("Server is running on port 8888");
    });