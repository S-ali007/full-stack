const connection = require("./db/db");
const cors = require("cors");
const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config();

connection()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR :", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running ${process.env.PORT}`);
    });
  })
  .catch((err) => {                                              
    console.log("MONGO CONNECTION FAILED !!!!", err);
  });
                                             