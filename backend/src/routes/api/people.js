import express from 'express';
import {
  getAllPeople
} from "../../controllers/peopleController.js";

const router = express.Router();

router.get('/',getAllPeople);

export default router;