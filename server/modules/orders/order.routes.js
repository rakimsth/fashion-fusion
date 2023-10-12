const express = require("express");
const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const Controller = require("./order.controller");
const secureAPI = require("../../utils/secure");

const FRONTEND_URL = process.env.FRONTEND_URL;
const endpointSecret = process.env.ENDPOINT_SECRET;

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { limit, page, name, isArchived } = req.query;
    const search = { name, isArchived };
    const result = await Controller.list(limit, page, search);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.patch("/status/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    req.body.updated_at = new Date();
    const result = await Controller.approve(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_at = new Date();
    req.body.updated_by = req.currentUser;
    const result = await Controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const payload = { updated_by: req.currentUser };
    const result = await Controller.deleteById(req.params.id, payload);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: `${FRONTEND_URL}/checkout/success`,
      cancel_url: `${FRONTEND_URL}/checkout/failed`,
    });
    res.json({ data: { id: session.id, url: session.url }, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
      switch (event.type) {
        case "checkout.session.async_payment_failed":
          const async_payment_failed = event.data.object;
          await Controller.updateBasedonPayment(async_payment_failed);
          break;
        case "checkout.session.async_payment_succeeded":
          const async_payment_succeeded = event.data.object;
          await Controller.updateBasedonPayment(async_payment_succeeded);
          break;
        case "checkout.session.completed":
          const session_completed = event.data.object;
          await Controller.updateBasedonPayment(session_completed);
          break;
        case "checkout.session.expired":
          const session_expired = event.data.object;
          await Controller.updateBasedonPayment(session_expired);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.send();
  }
);

module.exports = router;
