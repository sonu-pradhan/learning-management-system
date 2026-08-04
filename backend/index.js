import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import dbConnection from "./config/database.js";
import userRoute from "./routes/userRoutes.js"
import courseRoute from "./routes/courseRoutes.js"


dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
});