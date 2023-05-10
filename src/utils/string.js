const { customAlphabet } = require('nanoid');

const camel2KebabCase = (camelCase) =>
  camelCase
    .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
    .replace(/^./, (match) => match.toLowerCase())
    .trim();

const generateId = (length = 18, allowedChars) => {
  // eslint-disable-next-line no-param-reassign
  allowedChars =
    allowedChars ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nanoid = customAlphabet(allowedChars, length);

  return nanoid();
};
module.exports = { camel2KebabCase, generateId };
