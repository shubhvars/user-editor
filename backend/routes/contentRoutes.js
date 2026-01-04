const express = require('express');
const router = express.Router();
const {
    getAllContent,
    getContentById,
    getContentBySlug,
    createContent,
    updateContent,
    deleteContent,
    togglePublish
} = require('../controllers/contentController');

// Public routes
router.get('/', getAllContent);
router.get('/slug/:slug', getContentBySlug);
router.get('/:id', getContentById);

// Admin routes (no auth as per requirement)
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);
router.patch('/:id/toggle-publish', togglePublish);

module.exports = router;
