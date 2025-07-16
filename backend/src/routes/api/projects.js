import express from 'express';
import {
  getAllProjects
} from "../../controllers/projectsController.js";

const router = express.Router();

router.get('/',getAllProjects);

export default router;