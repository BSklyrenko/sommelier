class SommelierViewModel {
  wineRating: WineRating;                                                    // инстанс класса, формирующего итоговый список винных бутылок
  sommeliers: SommelierManage;                                               // инстанс класса по управлеюнию списком сомелье
  degustationWindow: Degustation;                                            // инстанс класса по управлению окном дегустирования

  newSommelierName: any;                                                     // поле содержит имя текущего сомелье
  sommeliersVisible: any;                                                    // состояние главного окна
  wineTestVisible: any;                                                      // состояние окна дегустирования
  resultsVisible: any;

  showDegustationWindow: any;                                                // состояние окна результатов дегустирования

  constructor() {
    var self = this;
    this.wineRating = new WineRating();
    this.sommeliers = new SommelierManage();
    this.degustationWindow = new Degustation();

    this.newSommelierName = ko.observable();

    this.sommeliersVisible = ko.observable(true);
    this.wineTestVisible = ko.observable(false);
    this.resultsVisible = ko.observable(false);
    this.showDegustationWindow = (sommelier) => {
      self.sommeliersVisible(false);
      self.wineTestVisible(true);
      self.degustationWindow.makeDegustation(sommelier);
    }
  }

  addSommelier(): void {
    if(!this.newSommelierName()) return;
    this.sommeliers.addSommelier(this.newSommelierName());
    this.newSommelierName('');
  }

  saveDegustattionResult(): void {                                           // метод сохраняет результат дегустирования
    this.degustationWindow.saveResult();
    this.sommeliersVisible(true);
    this.wineTestVisible(false);
  }

  showResults(): void {                                                      // метод открывает окно результатов дегустирования
    this.sommeliersVisible(false);
    this.wineRating.getWine();
    this.resultsVisible(true);
  }

  hideResults(): void {                                                      // метод закрвыает результаты дегустирования
    this.resultsVisible(false);
    this.sommeliersVisible(true);
  }
}

ko.applyBindings(new SommelierViewModel());
