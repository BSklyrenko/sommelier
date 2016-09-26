function Degustation() {
  this.wineList = ko.observable();

  this.makeDegustation = function(sommelier) {
    this.wineList({
      wines: getFromStorage(WineBottle),
      sommelierName: sommelier.name
    });
    sommelier.canTest(false);
    sommelier.drinkStatusText('Thanks for degustation');
  };

  this.saveResult = function() {
    insertToStorage(this.wineList().wines);
  };
}
