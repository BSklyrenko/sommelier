class Degustation {
  wineList: any;

  constructor() {
    this.wineList = ko.observable();
  }

  makeDegustation(sommelier): void {
    this.wineList({
      wines: getFromStorage(WineBottle),
      sommelierName: sommelier.name
    });
    sommelier.canTest(false);
    sommelier.drinkStatusText('Thanks for degustation');
  }

  saveResult(): void {
    insertToStorage(this.wineList().wines);
  }
}
