const mongoose = require("mongoose");
const util = require("util");

(async () => {
  try {
    await util.promisify(mongoose.connect)(process.env.MONGO_DB_URL);
    console.log("Connecetion DB established.");
  } catch (error) {
    console.log("Connection Failed", error);
  }
})();
