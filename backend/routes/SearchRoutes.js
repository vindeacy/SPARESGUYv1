// routes/searchRoutes.js
import express from 'express';
import searchProducts from '../Controllers/SearchController';

const router = express.Router();

// GET /api/search
router.get('/', searchProducts);

export default router;
