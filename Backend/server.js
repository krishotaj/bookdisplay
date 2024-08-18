const express = require("express");
require("dotenv").config();
const connection = require("./Config/Connection");
const app = express();
const port = 8888;
const routes = require('./Routes/Routes');
const cors = require("cors");
app.use(express.json());
app.use(cors(
    { origin: "*" })
);

app.get('/users', async (req, res) => {
    try {
      const users = await User.find(); 
      res.json(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


  app.use('/api', routes);



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    });