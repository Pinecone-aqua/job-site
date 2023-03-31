import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const db = mongoose
  .connect(process.env.MONGO_DB_CONNECT)
  .then((res) => {
    console.log("Job_Site DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
