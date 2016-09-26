function WineBottle (wineObj) {                                    // конструктор для винных бутылок
  this.name = wineObj.name;
  this.age = wineObj.age;
  this.rating = wineObj.rating;
  this.sommelierRating = ko.observable();

  this.hideName = function() {                                     // метод создающий патерн для скрытия названия вин
    return $.map(this.name.split(''), function() {return '*';}).join('');
  };

  this.getAverageScore = function() {                              // метод рассчитывает средний рейтинг основываясь на значениях,
    var totalScore = 0;                                            // записанных в ассоциативном массиве рейтинга
    var sommeliers = Object.keys(this.rating).length;
    for(var key in this.rating) {
      totalScore += this.rating[key];
    }
    return totalScore === 0 ? 0 : Math.floor((totalScore)/(sommeliers));
  };

  this.insertSommelierRating = function(name) {
    if(name) {
      this.rating[name] = this.sommelierRating();
    }
  };
}

function Sommelier(name) {                                        // конструктор сомелье
  this.name = name;
  this.canTest = ko.observable(true);
  this.drinkStatusText = ko.observable('Drink some wine');
}

function SommelierViewModel() {
  var self = this;

  self.wineList = ko.observable();                                 // массив винных бутылок
  self.sommeliers = ko.observableArray([]);                        // массив созданных сомелье
  self.newSommelierName = ko.observable();                         // поле содержит имя текущего сомелье

  self.sommeliersVisible = ko.observable(true);                    // состояние главного окна
  self.wineTestVisible = ko.observable(false);                     // состояние окна дегустирования
  self.resultsVisible = ko.observable(false);                      // состояние окна результатов дегустирования

  self.addSommelier = function() {                                 // метод создает нового сомелье
    if(!self.newSommelierName()) return;
    self.sommeliers.push(new Sommelier(self.newSommelierName()));
    self.newSommelierName('');
  };

  self.showDigustationWindow = function(sommelier) {                            // метод, обращаясь к условной бд,
    sommelier.canTest(false);
    sommelier.drinkStatusText('Thanks for digustation');           // создает список винных бутылок для
    self.sommeliersVisible(false);                                 // отображения его в окне дегустирования
    self.wineTestVisible(true);
    self.wineList({
      wines: getFromStorage(WineBottle),
      sommelierName: sommelier.name
    });
  };

  self.saveTable = function() {
    insertToStorage(self.wineList().wines);                        // метод сохраняет результат дегустирования
    self.wineList(null);
    self.sommeliersVisible(true);
    self.wineTestVisible(false);
  };

  self.showResults = function() {                                  // метод открывает окно результатов дегустирования
    self.sommeliersVisible(false);                                 // используя данные записанные в условную бд
    self.wineList({ wines: getFromStorage(WineBottle) });
    self.resultsVisible(true);
  };

  self.hideResults = function() {                                   // метод закрвыает результаты дегустирования
    self.wineList(null);
    self.resultsVisible(false);
    self.sommeliersVisible(true);
  };
}

ko.applyBindings(new SommelierViewModel());
