var mongoose = require("mongoose");
var mongoDB = process.env.MONGO_URI;

try {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");
} catch (error) {
  console.log(error);
  console.log("database connection failed");
}
module.exports = mongoose;
