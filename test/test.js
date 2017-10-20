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
    assertTrue(coordinates.toString() === "A1");
};

LyngkTestCase.prototype.testStory4 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertEquals(coordinates.getFormatCoord(), 'invalid');
};

LyngkTestCase.prototype.testStory5 = function () {
    var coord_1 = new Lyngk.Coordinates('A', 1);
    var coord_2 = coord_1.clone();
    assertEquals(coord_1.toString(), coord_2.toString());
};

LyngkTestCase.prototype.testStory6 = function () {
    var arrayHashs = [];
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    for (var c = 0; c < letters.length; c++) {
        for (var l = 1; l < 10; l++) {
            var coord = new Lyngk.Coordinates(letters[c], l);
            if (coord.is_valid()) {
                var hash = coord.getHash();
                if (arrayHashs.indexOf(hash) === -1) {
                    arrayHashs.push(hash);
                }
            }
        }
    }
    assertEquals(arrayHashs.length, 43);
};

LyngkTestCase.prototype.testStory7 = function () {
    var inter_1 = new Lyngk.Intersection(new Lyngk.Coordinates('A', 1));
    assertEquals(inter_1.getState(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory8 = function () {
    var inter_1 = new Lyngk.Intersection(new Lyngk.Coordinates('A', 1));
    inter_1.poserPiece("bleu");
    assertEquals(inter_1.getColorLastPiece(), "bleu");
    assertEquals(inter_1.getState(), Lyngk.State.ONE_PIECE);
};

LyngkTestCase.prototype.testStory9 = function () {
    var inter_1 = new Lyngk.Intersection(new Lyngk.Coordinates('A', 1));
    inter_1.poserPiece("bleu");
    inter_1.poserPiece("rouge");
    assertEquals(inter_1.getColorLastPiece(), "rouge");
    assertEquals(inter_1.getState(), Lyngk.State.STACK);
};

LyngkTestCase.prototype.testStory10 = function () {
    var inter_1 = new Lyngk.Intersection(new Lyngk.Coordinates('A', 1));
    inter_1.poserPiece("bleu");
    inter_1.poserPiece("rouge");
    inter_1.poserPiece("vert");
    inter_1.poserPiece("bleu");
    inter_1.poserPiece("rouge");
    assertEquals(inter_1.getState(), Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.testStory11 = function () {
    var plateau = new Lyngk.Engine();
    var intersections = plateau.getIntersections();
    assertEquals(intersections.length, 43);
    for (var iter = 0; iter < intersections.length; iter++) {
        assertEquals(intersections[iter].getNbPieces(), 1);
    }
};

LyngkTestCase.prototype.testStory12 = function () {
    var plateau = new Lyngk.Engine();
    plateau.getRandomColor();

    var intersections = plateau.getIntersections();
    var nb_pieces_black = 0;
    var nb_pieces_ivory = 0;
    var nb_pieces_blue = 0;
    var nb_pieces_red = 0;
    var nb_pieces_green = 0;
    var nb_pieces_white = 0;
    for (var inter = 0; inter < intersections.length; inter++) {
        switch (intersections[inter].getColorLastPiece()) {
            case Lyngk.Color.BLACK :
                nb_pieces_black++;
                break;
            case Lyngk.Color.BLUE :
                nb_pieces_blue++;
                break;
            case Lyngk.Color.GREEN :
                nb_pieces_green++;
                break;
            case Lyngk.Color.RED :
                nb_pieces_red++;
                break;
            case Lyngk.Color.IVORY :
                nb_pieces_ivory++;
                break;
            case Lyngk.Color.WHITE :
                nb_pieces_white++;
                break
        }
    }
    assertEquals(nb_pieces_white, 3);
    assertEquals(nb_pieces_red, 8);
    assertEquals(nb_pieces_blue, 8);
    assertEquals(nb_pieces_ivory, 8);
    assertEquals(nb_pieces_green, 8);
    assertEquals(nb_pieces_black, 8);
};

LyngkTestCase.prototype.teststory13 = function () {
    var plateau = new Lyngk.Engine();
    var intersections = plateau.getIntersections();
    for (var iter = 0; iter < intersections.length; iter++) {
        assertEquals(intersections[iter].getPile().length, 1);
    }
};