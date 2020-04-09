class HeroImageServiceFunc {
  constructor(apiService, PUBLIC_URL) {
    'ngInject';
    this.PUBLIC_URL = PUBLIC_URL;
    this.apiService = apiService;
  }

  getHeroImageByHeroObject(heroObject, type) {
    var heroImagesObject = [];
    if (heroObject.hasOwnProperty('relateHeroImages')) {
      heroImagesObject = heroObject.relateHeroImages;
    }
    if (heroImagesObject.length > 0) {
      var imageObj = heroImagesObject[0];
      var image = false;
      switch (type) {
        case 'thumbnail':
          image = imageObj.thumbnail;
          break;
        case 'original':
          image = imageObj.original;
          break;
        default:
          image = imageObj.image;
          break;
      }

      if (image)
        return `${this.PUBLIC_URL}/files/${type}/${image}`;
      return `${this.PUBLIC_URL}/files/no_image.png`;
    }
    return `${this.PUBLIC_URL}/files/no_image.png`;
  }
}

const HeroImageService = {
  selector: 'heroImageService',
  service: HeroImageServiceFunc
};

export default HeroImageService;
