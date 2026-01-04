const Content = require('../models/Content');

// @desc    Get all content
// @route   GET /api/content
// @access  Public
const getAllContent = async (req, res) => {
    try {
        const { published } = req.query;
        let query = {};

        // Filter by published status if specified
        if (published === 'true') {
            query.isPublished = true;
        } else if (published === 'false') {
            query.isPublished = false;
        }

        const content = await Content.find(query).sort({ category: 1, order: 1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: content.length,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single content by ID
// @route   GET /api/content/:id
// @access  Public
const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get content by slug
// @route   GET /api/content/slug/:slug
// @access  Public
const getContentBySlug = async (req, res) => {
    try {
        const content = await Content.findOne({ slug: req.params.slug });

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new content
// @route   POST /api/content
// @access  Admin
const createContent = async (req, res) => {
    try {
        const { title, content, category, order, isPublished } = req.body;

        const newContent = await Content.create({
            title,
            content,
            category,
            order,
            isPublished
        });

        res.status(201).json({
            success: true,
            message: 'Content created successfully',
            data: newContent
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A content with this title already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Admin
const updateContent = async (req, res) => {
    try {
        const { title, content, category, order, isPublished } = req.body;

        const updatedContent = await Content.findByIdAndUpdate(
            req.params.id,
            { title, content, category, order, isPublished },
            { new: true, runValidators: true }
        );

        if (!updatedContent) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Content updated successfully',
            data: updatedContent
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A content with this title already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Admin
const deleteContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Content deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Toggle publish status
// @route   PATCH /api/content/:id/toggle-publish
// @access  Admin
const togglePublish = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        content.isPublished = !content.isPublished;
        await content.save();

        res.status(200).json({
            success: true,
            message: `Content ${content.isPublished ? 'published' : 'unpublished'} successfully`,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllContent,
    getContentById,
    getContentBySlug,
    createContent,
    updateContent,
    deleteContent,
    togglePublish
};
