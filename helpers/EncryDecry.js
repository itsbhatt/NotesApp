const { encode, decode } = require('emojily');

exports.Backward = (text) => {
  return text.split('').reverse().join('');
};

exports.EmogizeEncry = (text) => {
  return encode(text);
};

exports.EmogizeDecry = (text) => {
  return decode(text);
};

exports.LetterScrambleEncry = (text) => {
  const wordArr = text.trim().split('');

  for (let i = 0; i < wordArr.length - 1; i++) {
    const prevLetter = wordArr[i];
    wordArr[i] = wordArr[i + 1];
    wordArr[i + 1] = prevLetter;
  }

  for (let i = 0; i < wordArr.length / 2; i++) {
    const start = i;
    const end = wordArr.length - 1 - i;

    const prevLetter = wordArr[start];
    wordArr[start] = wordArr[end];
    wordArr[end] = prevLetter;
  }

  return wordArr.join('');
};

exports.LetterScrambleDecry = (text) => {
  const wordArr = text.trim().split('');

  for (let i = 0; i < wordArr.length / 2; i++) {
    const start = i;
    const end = wordArr.length - 1 - i;

    const prevLetter = wordArr[start];
    wordArr[start] = wordArr[end];
    wordArr[end] = prevLetter;
  }

  for (let i = wordArr.length - 1; i > 0; i--) {
    const prevLetter = wordArr[i];
    wordArr[i] = wordArr[i - 1];
    wordArr[i - 1] = prevLetter;
  }

  return wordArr.join('');
};
