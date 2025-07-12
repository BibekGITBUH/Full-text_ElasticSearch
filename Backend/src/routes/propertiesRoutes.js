import express from 'express';
const router = express.Router();
import searchProperties from '../controllers/searchProperties.js';
import {AddProperty} from '../controllers/AddProperty.js';


router.use('/search-properties',searchProperties);
router.post("/add-property",AddProperty.createProperty);

export default router;