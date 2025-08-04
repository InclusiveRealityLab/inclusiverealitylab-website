import express from "express";
import {
  getAllProjects,
  getAllCurrentProjects,
  getAllPastProjects,getFeaturedProjects
} from "../../controllers/projectsController.js";

const router = express.Router();

router.get("/", getAllProjects);

router.get("/current", getAllCurrentProjects);

router.get("/past", getAllPastProjects);

router.get("/featured", getFeaturedProjects);
export default router;
