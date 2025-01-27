import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  event_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 45,
  },
  location: {
    type: String,
    required: true,
    maxlength: 45,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, 
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
    maxlength: 45,
  },
  capacity: {
    type: String,
    maxlength: 45,
  },
  image_url: { 
    type: String,
    required: false,
    maxlength: 250
  },
});

export const events = mongoose.model('events', eventSchema);
