const express = require('express');
const router = express.Router();
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Admin
router.post('/', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                message: 'No image provided'
            });
        }

        // Extract base64 data
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Upload to Cloudinary
        const result = await uploadToCloudinary(buffer);

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message
        });
    }
});

module.exports = router;
