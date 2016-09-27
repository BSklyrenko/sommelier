function SommelierViewModel() {
  var self = this;

  self.wineRating = new WineRating();                              // инстанс класса, формирующего итоговый список винных бутылок
  self.sommeliers = new SommelierManage();                         // инстанс класса по управлеюнию списком сомелье
  self.degustationWindow = new Degustation();                      // инстанс класса по управлению окном дегустирования

  self.newSommelierName = ko.observable();                         // поле содержит имя текущего сомелье

  self.sommeliersVisible = ko.observable(true);                    // состояние главного окна
  self.wineTestVisible = ko.observable(false);                     // состояние окна дегустирования
  self.resultsVisible = ko.observable(false);                      // состояние окна результатов дегустирования

  self.addSommelier = function() {                                 // метод добавляет нового сомелье
    if(!self.newSommelierName()) return;
    self.sommeliers.addSommelier(self.newSommelierName());
    self.newSommelierName('');
  };

  self.showDegustationWindow = function(sommelier) {
    self.sommeliersVisible(false);
    self.wineTestVisible(true);
    self.degustationWindow.makeDegustation(sommelier);
  };

  self.saveDegustattionResult = function() {                       // метод сохраняет результат дегустирования
    self.degustationWindow.saveResult();
    self.sommeliersVisible(true);
    self.wineTestVisible(false);
  };

  self.showResults = function() {                                  // метод открывает окно результатов дегустирования
    self.sommeliersVisible(false);
    self.wineRating.getWine();
    self.resultsVisible(true);
  };

  self.hideResults = function() {                                   // метод закрвыает результаты дегустирования
    self.resultsVisible(false);
    self.sommeliersVisible(true);
  };
}

ko.applyBindings(new SommelierViewModel());
