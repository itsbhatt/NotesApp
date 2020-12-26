const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    encryption: {
      type: String,
      enum: ['none', 'backwards', 'letterscramble', 'emogize'],
      required: true,
    },
    background: {
      type: String,
      default: '#000000',
    },
  },
  { timestamps: true }
);

module.exports = Note = mongoose.model('note', NoteSchema);
