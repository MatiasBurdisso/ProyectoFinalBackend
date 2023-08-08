import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchae_datetime: Date,
  amount: Number,
  purchaser: String,
  created_at: Date,
  updated_at: Date,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;