import '../../assets/images/carousel';

// Import all images from the carousel folder dynamically
function importAll(r) {
    return r.keys().map(r);
  }
  
  const foodImages = importAll(require.context('import '../../assets/images/carousel';, false, /\.(png|jpeg|png|jpg)$/));
  
  export default FoodCarouselImages;
  