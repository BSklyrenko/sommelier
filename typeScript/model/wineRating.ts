class WineRating {
  wineRatingList: any;

  constructor() {
    this.wineRatingList = ko.observable();
  }

  getWine(): void {
    this.wineRatingList({ wines: getFromStorage(WineBottle) });
  }
}
