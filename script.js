var wineBase = [
    {
        name: "Massandra",
        age: 16,
        rating: {}
    },
    {
        name: "Koktebel",
        age: 10,
        rating: {}
    },
    {
        name: "Inkerman",
        age: 5,
        rating: {}
    },
    {
        name: "Magarach",
        age: 3,
        rating: {}
    },
    {
        name: "Satera",
        age: 7,
        rating: {}
    }
];
wineBase = JSON.stringify(wineBase);
function getFromStorage(Constructor) {
    return $.map(JSON.parse(wineBase), function (item) { return new Constructor(item); });
}
function insertToStorage(obj) {
    wineBase = JSON.stringify(obj);
}
var WineBottle = (function () {
    function WineBottle(wineObj) {
        this.name = wineObj.name;
        this.age = wineObj.age;
        this.rating = wineObj.rating;
        this.sommelierRating = ko.observable();
    }
    WineBottle.prototype.hideName = function () {
        return $.map(this.name.split(''), function () { return '*'; }).join('');
    };
    WineBottle.prototype.getAverageScore = function () {
        var totalScore = 0;
        var sommeliers = Object.keys(this.rating).length;
        for (var key in this.rating) {
            totalScore += this.rating[key];
        }
        return totalScore === 0 ? 0 : Math.floor((totalScore) / (sommeliers));
    };
    WineBottle.prototype.insertSommelierRating = function (name) {
        if (name) {
            this.rating[name] = this.sommelierRating();
        }
    };
    return WineBottle;
}());
var SommelierManage = (function () {
    function SommelierManage() {
        this.sommelierList = ko.observableArray([]);
    }
    SommelierManage.prototype.addSommelier = function (name) {
        this.sommelierList.push(new Sommelier(name));
    };
    return SommelierManage;
}());
var Sommelier = (function () {
    function Sommelier(name) {
        this.name = name;
        this.canTest = ko.observable(true);
        this.drinkStatusText = ko.observable('Drink some wine');
    }
    return Sommelier;
}());
var Degustation = (function () {
    function Degustation() {
        this.wineList = ko.observable();
    }
    Degustation.prototype.makeDegustation = function (sommelier) {
        this.wineList({
            wines: getFromStorage(WineBottle),
            sommelierName: sommelier.name
        });
        sommelier.canTest(false);
        sommelier.drinkStatusText('Thanks for degustation');
    };
    Degustation.prototype.saveResult = function () {
        insertToStorage(this.wineList().wines);
    };
    return Degustation;
}());
var WineRating = (function () {
    function WineRating() {
        this.wineRatingList = ko.observable();
    }
    WineRating.prototype.getWine = function () {
        this.wineRatingList({ wines: getFromStorage(WineBottle) });
    };
    return WineRating;
}());
var SommelierViewModel = (function () {
    function SommelierViewModel() {
        var self = this;
        this.wineRating = new WineRating();
        this.sommeliers = new SommelierManage();
        this.degustationWindow = new Degustation();
        this.newSommelierName = ko.observable();
        this.sommeliersVisible = ko.observable(true);
        this.wineTestVisible = ko.observable(false);
        this.resultsVisible = ko.observable(false);
        this.showDegustationWindow = function (sommelier) {
            self.sommeliersVisible(false);
            self.wineTestVisible(true);
            self.degustationWindow.makeDegustation(sommelier);
        };
    }
    SommelierViewModel.prototype.addSommelier = function () {
        if (!this.newSommelierName())
            return;
        this.sommeliers.addSommelier(this.newSommelierName());
        this.newSommelierName('');
    };
    SommelierViewModel.prototype.saveDegustattionResult = function () {
        this.degustationWindow.saveResult();
        this.sommeliersVisible(true);
        this.wineTestVisible(false);
    };
    SommelierViewModel.prototype.showResults = function () {
        this.sommeliersVisible(false);
        this.wineRating.getWine();
        this.resultsVisible(true);
    };
    SommelierViewModel.prototype.hideResults = function () {
        this.resultsVisible(false);
        this.sommeliersVisible(true);
    };
    return SommelierViewModel;
}());
ko.applyBindings(new SommelierViewModel());
