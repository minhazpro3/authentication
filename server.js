const app = require("./app");
require("dotenv").config();
const { dbConnection } = require("./utils/dbConnection");
const PORT = process.env.PORT || 5000;

// database connection
dbConnection();
app.all("*", (req, res) => {
  res.send("Could not find route");
});

app.listen(PORT, () => {
  console.log(`Server running at on port ${PORT}`);
});
