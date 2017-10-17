'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertFalse(coordinates.is_valid());
};

LyngkTestCase.prototype.testStory2 = function () {
    var compteur = 0;
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    for (var c = 0; c < letters.length; c++) {
        for (var l = 1; l < 10; l++) {
            if (new Lyngk.Coordinates(letters[c], l).is_valid())
                compteur++;
        }
    }

    assertEquals(compteur, 43);

};

LyngkTestCase.prototype.testStory3 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertTrue(coordinates.toString()==="A1");
};

LyngkTestCase.prototype.testStory4 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertEquals(coordinates.getFormatCoord(), 'invalid');
};

LyngkTestCase.prototype.testStory5 = function () {
    var coord_1= new Lyngk.Coordinates('A', 1);
    var coord_2 = coord_1.clone();
    assertEquals(coord_1.toString(), coord_2.toString());
};

LyngkTestCase.prototype.testStory6 = function () {
    var arrayHashs = [];
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    for (var c = 0; c < letters.length; c++) {
        for (var l = 1; l < 10; l++) {
            var coord = new Lyngk.Coordinates(letters[c], l);
            if(coord.is_valid()) {
                var hash = coord.getHash();
                if (arrayHashs.indexOf(hash) === -1) {
                    arrayHashs.push(hash);
                }
            }
        }
    }
    assertEquals(arrayHashs.length, 43);
};
