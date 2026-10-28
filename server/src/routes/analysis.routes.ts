import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import { analyze, getHistory, getAnalysis, deleteAnalysis } from '../controllers/analysis.controller';

const router = Router();

// All routes require auth
router.use(protect);

router.post('/analyze', upload.single('resume'), analyze);
router.get('/history', getHistory);
router.get('/:id', getAnalysis);
router.delete('/:id', deleteAnalysis);

export default router;
