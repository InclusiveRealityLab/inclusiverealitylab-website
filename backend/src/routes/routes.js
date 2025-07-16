import express from 'express';

const router = express.Router();

// import index js route 

import api from "./api/index.js";
router.use("/api", api);


export default router;