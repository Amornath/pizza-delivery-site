const express = require("express");
const Order = require("../models/orderModel");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KIx3SIQbwpD8gifenGXLaGfHHsq8ZVgizL8LqiDMjmNx5sHZnjbwKharB2badEFUjTDOJml1fGG3ZZBEmsy4xzh00qs603m3J"
);

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: subTotal * 100,
        currency: "BDT",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        orderAmount: subTotal,
        transactionId: payment.source.id,
      });
      newOrder.save((err, data) => {
        if (err) {
          return res.status(400).json({ message: err });
        } else {
          res.send("Order placed successfully");
        }
      });
    } else {
      res.send("Payment fail");
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get("/getuserorder/:id", async (req, res) => {
  // const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: req.params.id }).sort({
      createdAt: -1,
    });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getallorder", async (req, res) => {
  // const { userid } = req.body;
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/deliverorder/:id", async (req, res) => {
  // const { userid } = req.body;
  try {
    const order = await Order.findOne({ _id: req.params.id });
    order.isDelivered = true;
    await Order.findByIdAndUpdate(req.params.id, order, {
      new: true,
    });
    res.send("Oder delivered");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
