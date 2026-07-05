import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecomm");
    console.log("Mongo connected!");

    await seedInitialProducts();

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Failed to connect!", err);
  }
};

void startServer();
