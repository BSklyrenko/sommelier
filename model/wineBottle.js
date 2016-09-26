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
