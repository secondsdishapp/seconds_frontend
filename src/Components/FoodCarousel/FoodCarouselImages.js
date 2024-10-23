// Dynamically import all images from the carousel folder
const foodImages = import.meta.glob('../../assets/images/carousel/*.{png,jpeg,jpg,webp}', { eager: true });

// Convert the imported images into an array of objects with 'src' and 'alt'
const foodImagesData = Object.keys(foodImages).map((key, index) => ({
  src: foodImages[key].default,
  alt: `Food Image ${index + 1}`,
}));

export default foodImagesData;
