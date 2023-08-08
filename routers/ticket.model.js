import { Router } from "express";
import Crypto from "crypto";
import ticketModel from "../DAO/models/ticket.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const myTicket = {
    code: Crypto.randomBytes(16).toString("hex").substring(0, 4),
    purchase_datetime: req.body.purchase_datetime,
    amount: req.body.amount,
    purchaser: req.body.purchaser,
    created_at: new Date(),
    updated_at: new Date(),
  };
  try {
    const ticket = await ticketModel.create(myTicket);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  const myTicket = {
    purchase_datetime: req.body.purchase_datetime,
    amount: req.body.amount,
    purchaser: req.body.purchaser,
    updated_at: new Date(),
  };

  try {
    const ticket = await ticketModel.findByIdAndUpdate(myTicket);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ticket = await ticketModel.findByIdAndDelete(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;