import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import authTokenJwt from "./middleware/authJwt.js";
import { createPost } from "./controllers/PostCntr.js";
import { register } from "./controllers/AuthCntr.js";

// CONFIGS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTE RELATED TO FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", authTokenJwt, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/posts", PostRoute);

// DATABASE CONNECT -> START SERVER
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "SocialApp",
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err.message} has occured`));
