import express from 'express';
import {
  getAllNews,getFeaturedNews
} from "../../controllers/newsController.js";

const router = express.Router();

router.get('/', getAllNews);
router.get('/featured',getFeaturedNews);

export default router;