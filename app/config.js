const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  baseurl: process.env.BASE_URL,
  port: process.env.PORT,
};
