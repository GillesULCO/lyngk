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

    assertTrue(compteur === 43);

};