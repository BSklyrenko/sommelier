class SommelierManage {                                                       // класс инкапсулирующий операции со списокм сомелье
  sommelierList: any;

  constructor() {
    this.sommelierList = ko.observableArray([]);
  }

  addSommelier(name): void {
    this.sommelierList.push(new Sommelier(name));
  }
}

class Sommelier {                                                             // конструктор сомелье
  name: string;
  canTest: boolean;
  drinkStatusText: string;

  constructor(name: string) {
    this.name = name;
    this.canTest = ko.observable(true);
    this.drinkStatusText = ko.observable('Drink some wine');
  }
}
