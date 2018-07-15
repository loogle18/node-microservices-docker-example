const { BOOK_DB_NAME, BOOK_DB_HOST } = process.env;

module.exports = {
  url: `mongodb://${BOOK_DB_HOST}/${BOOK_DB_NAME}`
};
