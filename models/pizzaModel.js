const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide item name"],
      maxlength: 50,
    },
    varients: [],
    prices: [],
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pizzas", pizzaSchema);
