const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { commonSchema } = require("../../utils/commonSchema");

const orderSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  amount: { type: Number, required: true },
  products: [
    {
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      product: { type: String, required: true },
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["COD", "CC", "Paypal"],
    default: "COD",
    required: true,
  },
  payment: { type: String, default: "COD" },
  orderId: { type: String },
  address: { type: String },
  email: { type: String },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "expired"],
    default: "pending",
  },
  ...commonSchema,
});

module.exports = model("Order", orderSchema);
