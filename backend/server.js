import express from "express";
import { connectDB } from "./db/db.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
//
import productRoutes from "./routes/productRoute.js";

//
const app = express();
// The path module with __dirname var is for Deployemnt
const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

// All Routes
app.use("/api", productRoutes);

// Deployment Process
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    // res.sendFile(path.resolve(__dirname, "/frontend/dist/index.html"));
  });
}

//               SERVER CONNECTION               \\
// ////////////////////////////////////////////////////////////////////////////////// //
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
