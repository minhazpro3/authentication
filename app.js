const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/v1/user.route");

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Server started success");
});

module.exports = app;
