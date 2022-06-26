const express = require("express");
const Pizza = require("../models/pizzaModel");
const router = express.Router();

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addpizza", async (req, res) => {
  const pizza = req.body.pizza;

  try {
    const newPizza = new Pizza({
      name: pizza.name,
      category: pizza.category,
      description: pizza.description,
      image: pizza.image,
      prices: pizza.prices,
      varients: pizza.varients,
    });
    await newPizza.save();
    res.send("New Pizza Added");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/editpizza/:id", async (req, res) => {
  const editedPizza = req.body.pizza;

  try {
    const pizza = await Pizza.findOne({ _id: req.params.id });
    (pizza.name = editedPizza.name),
      (pizza.category = editedPizza.category),
      (pizza.description = editedPizza.description),
      (pizza.image = editedPizza.image),
      (pizza.prices = editedPizza.prices),
      (pizza.varients = editedPizza.varients);

    // await pizza.save();
    await Pizza.findByIdAndUpdate(req.params.id, pizza, {
      new: true,
    });
    res.send("Pizza Updated Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/deletepizza/:id", async (req, res) => {
  try {
    await Pizza.findOneAndDelete({ _id: req.params.id });

    res.send("Pizza Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
