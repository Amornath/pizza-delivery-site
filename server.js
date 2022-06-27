const express = require("express");
const app = express();
const path = require("path");
const db = require("./db.js");
const Pizza = require("./models/pizzaModel");

const pizzaRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("<h1>Server runing</h1>");
// });

app.use("/api/pizzas/", pizzaRoute);
app.use("/api/auth/", userRoute);
app.use("/api/orders/", orderRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
