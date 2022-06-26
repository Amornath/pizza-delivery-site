var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://Amor:Password%401@firstproject.h3wcp.mongodb.net/MernPizza?retryWrites=true&w=majority";

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
