import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server is running locally on port : ${PORT}`);
})