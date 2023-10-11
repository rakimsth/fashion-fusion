require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51KZSYDKUR5nwsW1NbLn6GtfE131zTfE0GHVwxkVvA2FGxfTErkBYFTPijSjrjcTh01nwaUTEznX4RtXzC3wnpszN00ALB1IdAk"
);

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const indexRouter = require("./routes");

mongoose.connect(DB_URL).then(console.log("Database Connected..."));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/create-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
  });
  res.json({ client_secret: paymentIntent.client_secret });
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body,
    mode: "payment",
    success_url: "http://localhost:5174/checkout/success",
    cancel_url: "http://localhost:5174/checkout/failed",
  });
  res.json({ data: session, msg: "success" });
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err
    ? err.toString().split("Error: ")[1]
    : "Something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
