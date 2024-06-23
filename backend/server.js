require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const searchSettingsRoutes = require("./routes/searchSettings");

// create express app
const app = express();

// middleware
app.use(express.json());
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// routes
app.use("/api/searchSettings", searchSettingsRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // setting up listener
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
