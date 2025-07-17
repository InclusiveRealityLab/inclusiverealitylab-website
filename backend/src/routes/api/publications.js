import express from 'express';
import {
  getAllPublications,getPubData,getVenueData
} from "../../controllers/publicationsController.js";

const router = express.Router();

router.get('/',getAllPublications);

router.get('/venues',getVenueData);

router.get('/pubs',getPubData);


export default router;