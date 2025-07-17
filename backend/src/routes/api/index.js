// import all routes
import express from "express";
import projects from "./projects.js";
import people from "./people.js";
import publications from "./publications.js"

const router = express.Router();

// routes for accessing projects data
router.use("/projects", projects);

// routes for accessing publications data TODO: create publications controller
router.use('/publications', publications);

// //routes for accessing people related data TODO: create people controller
router.use("/people", people);

export default router;
