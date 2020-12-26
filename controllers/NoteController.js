const Note = require('../models/Note');

const {
  Backward,
  EmogizeEncry,
  LetterScrambleEncry,
  EmogizeDecry,
  LetterScrambleDecry,
} = require('../helpers/EncryDecry');

exports.index = async (req, res, next) => {
  try {
    const noteData = await Note.find().sort('-updatedAt');

    res.json(noteData);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.decrypt = async (req, res, next) => {
  try {
    const noteData = await Note.findById(req.params.noteId).select(
      'text encryption'
    );

    let text = noteData.text;

    if (noteData.encryption === 'emogize') {
      text = EmogizeDecry(text);
    } else if (noteData.encryption === 'backwards') {
      text = Backward(text);
    } else if (noteData.encryption === 'letterscramble') {
      text = LetterScrambleDecry(text);
    }

    res.json({ text });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.create = async (req, res, next) => {
  try {
    const { text, encryption, background } = req.body;
    console.log(req.body);
    // return res.status(500).json({ message: 'Server Error' });

    let encpText = text.trim();

    if (encryption === 'emogize') {
      encpText = EmogizeEncry(encpText);
    } else if (encryption === 'backwards') {
      encpText = Backward(encpText);
    } else if (encryption === 'letterscramble') {
      encpText = LetterScrambleEncry(encpText);
    }

    const noteData = new Note({
      text: encpText,
      encryption: encryption.trim(),
      background: background.trim(),
    });
    await noteData.save();
    res.json(noteData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.update = async (req, res, next) => {
  try {
    const noteData = await Note.findById(req.params.noteId).select(
      'text encryption'
    );

    res.json(noteData);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Note.deleteOne({ _id: req.params.noteId });

    res.json({ message: 'successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
