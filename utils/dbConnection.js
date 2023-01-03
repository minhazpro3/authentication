const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE, {
      dbName: "authentication",
    })
    .then((res) => {});
};
