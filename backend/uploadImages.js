/**
 * Upload ALL extracted images to Cloudinary
 * Uses the new page-numbered format (page05_img1.png)
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const IMAGE_FOLDER = path.join(__dirname, '..', 'admin-portal', 'public', 'images', 'manual');

async function uploadImage(imagePath, imageName) {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'erpica-manual-v2',
            public_id: imageName.replace(/\.[^/.]+$/, ''),
            resource_type: 'image',
            overwrite: true
        });
        console.log(`✓ ${imageName}`);
        return { name: imageName, url: result.secure_url };
    } catch (error) {
        console.error(`✗ ${imageName}: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  Uploading ALL Images to Cloudinary');
    console.log('═══════════════════════════════════════════════════════════\n');

    const files = fs.readdirSync(IMAGE_FOLDER)
        .filter(f => f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.jpg'))
        .filter(f => f.startsWith('page'));

    console.log(`Found ${files.length} images to upload\n`);

    const imageMap = {};

    for (const file of files) {
        const filePath = path.join(IMAGE_FOLDER, file);
        const result = await uploadImage(filePath, file);
        if (result) {
            imageMap[result.name] = result.url;
        }
    }

    // Save mapping
    const mappingPath = path.join(IMAGE_FOLDER, 'cloudinary_urls.json');
    fs.writeFileSync(mappingPath, JSON.stringify(imageMap, null, 2));

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`  ✅ Uploaded ${Object.keys(imageMap).length} images`);
    console.log(`  📁 URL mapping saved to: cloudinary_urls.json`);
    console.log('═══════════════════════════════════════════════════════════\n');
}

main();
