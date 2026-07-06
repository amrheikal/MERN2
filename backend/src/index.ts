import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const port = 3001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") { 
  app.use(cors({ origin: "http://localhost:5173" }));
}


app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);



// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend2/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend2/build", "index.html"));
//   });
// }  


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend2/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend2", "dist", "index.html"));
  });
}

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
