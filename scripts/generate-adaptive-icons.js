#!/usr/bin/env node
// Generates adaptive Android icons and other supporting images from assets/images/icon.png
// Requires `sharp`.

const path = require('path');
const fs = require('fs');

const sharp = require('sharp');

const root = path.join(__dirname, '..');
const imagesDir = path.join(root, 'assets', 'images');
const src = path.join(imagesDir, 'icon.png');

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src);
  console.error('Place your source icon at assets/images/icon.png and re-run.');
  process.exit(1);
}

// Background color from app.json for Android adaptive background (fallback)
const androidBg = '#E6F4FE';

async function generate() {
  try {
    // Ensure output dir exists
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

    // 1) High-res app icon (1024x1024) with transparent background
    await sharp(src)
      .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(imagesDir, 'icon.png'));
    console.log('Wrote icon.png (1024)');

    // 2) Android adaptive foreground: transparent 432x432 (commonly used foreground size)
    await sharp(src)
      .resize(432, 432, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(imagesDir, 'android-icon-foreground.png'));
    console.log('Wrote android-icon-foreground.png (432)');

    // 3) Android adaptive background: full 1024x1024 filled with bg color
    const bgRgb = androidBg.replace('#', '');
    const r = parseInt(bgRgb.substring(0, 2), 16);
    const g = parseInt(bgRgb.substring(2, 4), 16);
    const b = parseInt(bgRgb.substring(4, 6), 16);

    await sharp({ create: { width: 1024, height: 1024, channels: 4, background: { r, g, b, alpha: 1 } } })
      .png()
      .toFile(path.join(imagesDir, 'android-icon-background.png'));
    console.log('Wrote android-icon-background.png (1024)');

    // 4) Android monochrome icon (grayscale) 1024
    await sharp(src)
      .resize(1024, 1024, { fit: 'contain' })
      .grayscale()
      .png()
      .toFile(path.join(imagesDir, 'android-icon-monochrome.png'));
    console.log('Wrote android-icon-monochrome.png (1024)');

    // 5) favicon (48x48)
    await sharp(src)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(imagesDir, 'favicon.png'));
    console.log('Wrote favicon.png (48)');

    // 6) splash icon used in splash config (approx 400)
    await sharp(src)
      .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(imagesDir, 'splash-icon.png'));
    console.log('Wrote splash-icon.png (400)');

    console.log('\nAll adaptive assets generated in assets/images.');
    console.log('Run `expo start -c` or rebuild your app to pick up the new icons.');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generate();
