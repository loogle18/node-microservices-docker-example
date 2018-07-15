const { USER_DB_USER_NAME, USER_DB_PASSWORD, USER_DB_NAME, USER_DB_HOST } = process.env;

module.exports = {
  options: {},
  url: `postgres://${USER_DB_USER_NAME}:${USER_DB_PASSWORD}@${USER_DB_HOST}/${USER_DB_NAME}`
};
