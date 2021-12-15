require("dotenv").config();

const express = require("express");

const connection = require("./config/connection");

const routes = require("./routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const init = async () => {
  try {
    //  force true deletes all data from db
    await connection.sync({ force: true });

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(`[ERROR]: Connection to DB failed - ${error.message}`);
  }
};

console.log(process.env.DB_HOST);

init();
