// Importing the constant in another file
const { DB_NAME } = require("../constants");

const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB}${DB_NAME}`
    );
    console.log(
      `Connected Successfully .....DB host: ${connectionInstance.connection.host} with DB :${DB_NAME}`
    );
  } catch (error) {
    console.error(" MongoDB Connection failed:", error.message);
    process.exit(1);
  }
};
