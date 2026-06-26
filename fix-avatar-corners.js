const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public/assets/images/avatar-default.png');
const outputPath = path.join(__dirname, 'public/assets/images/avatar-default.png');

async function roundCorners() {
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  const margin = 35; // cut inside to remove white border
  const maskWidth = width - margin * 2;
  const maskHeight = height - margin * 2;
  const radius = Math.round(Math.min(maskWidth, maskHeight) * 0.28);

  // Create rounded rectangle mask with margin
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}">` +
    `<rect x="${margin}" y="${margin}" width="${maskWidth}" height="${maskHeight}" rx="${radius}" ry="${radius}" fill="white"/>` +
    `</svg>`
  );

  // Composite the image with the mask
  await sharp(inputPath)
    .composite([{
      input: await sharp(mask, { density: 72 }).png().toBuffer(),
      blend: 'dest-in'
    }])
    .png()
    .toFile(outputPath + '.tmp');

  fs.renameSync(outputPath + '.tmp', outputPath);
  console.log('Avatar corners fixed:', outputPath);
}

roundCorners().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
