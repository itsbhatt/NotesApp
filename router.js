const express = require('express');
const router = express.Router();

const {
  index,
  create,
  decrypt,
  update,
  remove,
} = require('./controllers/NoteController');

//use routes
router.get('/', index);

router.post('/create', create);

router.get('/:noteId/decrypt', decrypt);

router.put('/:noteId', update);

router.delete('/:noteId', remove);

module.exports = router;
