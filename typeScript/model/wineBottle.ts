class WineBottle {
  name: string;
  age: number;
  rating: any;
  sommelierRating: any;

  constructor(wineObj: any) {                                                  // конструктор для винных бутылок
    this.name = wineObj.name;
    this.age = wineObj.age;
    this.rating = wineObj.rating;
    this.sommelierRating = ko.observable();
  }

  hideName(): string {                                                          // метод создающий патерн для скрытия названия вин
    return $.map(this.name.split(''), function() {return '*';}).join('');
  }

  getAverageScore(): number {                                                   // метод рассчитывает средний рейтинг основываясь на значениях,
    var totalScore: number = 0;
    var sommeliers: number = Object.keys(this.rating).length;                   // записанных в ассоциативном массиве рейтинга
    for(var key in this.rating) {
      totalScore += this.rating[key];
    }
    return totalScore === 0 ? 0 : Math.floor((totalScore)/(sommeliers));
  }

  insertSommelierRating(name: string): void {
    if(name) {
      this.rating[name] = this.sommelierRating();
    }
  }
}
