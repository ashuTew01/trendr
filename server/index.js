import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import { upload } from './middleware/upload.js';
import { registerUser } from './controllers/authController.js';
import { createPost } from './controllers/postsController.js';
const app = express();
// import User from "./models/User.js"
// import Post from "./models/Post.js"
// import { users, posts } from './data/index.js';



import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { verifyToken } from './middleware/auth.js';

//Connecting to database
const port = process.env.PORT || 3002;
connectDB();

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);  //only when you change type to module in package.json, it is to get files on the server.
const __dirname = path.dirname(__filename);         // "
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));      //will change in production.


// Routes with files
app.post("/auth/register", upload.single("picture"), registerUser);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
    console.log("Server started on port " + port);
    //One Time
    // User.insertMany(users);
    // Post.insertMany(posts);
})




