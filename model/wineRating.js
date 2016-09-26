function WineRating() {
  this.wineRatingList = ko.observable();
  this.getWine = function() {
    this.wineRatingList({ wines: getFromStorage(WineBottle) });
  };
}
