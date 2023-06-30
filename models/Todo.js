import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const { sign } = jwt;


const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const todo = mongoose.model('todo', todoSchema);

export default todo;
