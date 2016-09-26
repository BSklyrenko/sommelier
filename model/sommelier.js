function SommelierManage() {
  this.sommelierList = ko.observableArray([]);                    // класс инкапсулирующий операции со списокм сомелье

  this.addSommelier = function(name) {
    this.sommelierList.push(new Sommelier(name));
  };

}

function Sommelier(name) {                                        // конструктор сомелье
  this.name = name;
  this.canTest = ko.observable(true);
  this.drinkStatusText = ko.observable('Drink some wine');
}
