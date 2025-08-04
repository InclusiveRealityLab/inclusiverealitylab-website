import express from 'express';
import {
  getAllPublications,getPubData,getVenueData,getFeaturedPublications
} from "../../controllers/publicationsController.js";

const router = express.Router();

router.get('/',getAllPublications);

router.get('/venues',getVenueData);

router.get('/pubs',getPubData);

router.get('/featured',getFeaturedPublications)


export default router;