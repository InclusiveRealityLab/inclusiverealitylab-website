import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server is running locally on port : ${PORT}`);
})