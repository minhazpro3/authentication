const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const { dbConnection } = require("./utils/dbConnection");
const router = require("./routes/v1/user_route");
const PORT = process.env.PORT || 5000;

// database connection
dbConnection();

app.use("/api/v1/user", router);

app.get("/", (req, res) => {
  res.send("Server started success");
});
app.all("*", (req, res) => {
  res.send("Could not find route");
});

app.listen(PORT, () => {
  console.log(`Server running at on port ${PORT}`);
});
