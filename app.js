const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

require("./routes")(app);

app.listen(3005, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
