'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");
Math.seedrandom("i2l-isidis");


LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertFalse(coordinates.isValid());
};

LyngkTestCase.prototype.testStory2 = function () {
    var compteur = 0;
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    for (var c = 0; c < letters.length; c++) {
        for (var l = 1; l < 10; l++) {
            if (new Lyngk.Coordinates(letters[c], l).isValid())
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
            if (coord.isValid()) {
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
    var nbPiecesForEachColors = [0, 0, 0, 0, 0, 0];
    for (var inter = 0; inter < intersections.length; inter++) {
        nbPiecesForEachColors[intersections[inter].getColorLastPiece()]++;
    }
    for(var color = 0; color<nbPiecesForEachColors.length;color++){
        if(color < nbPiecesForEachColors.length-1) {
            assertEquals(nbPiecesForEachColors[color], 8);
        }else{
            assertEquals(nbPiecesForEachColors[color], 3);
        }
    }
};

LyngkTestCase.prototype.teststory13 = function () {
    var plateau = new Lyngk.Engine();
    var intersections = plateau.getIntersections();
    for (var iter = 0; iter < intersections.length; iter++) {
        assertEquals(intersections[iter].getPile().length, 1);
    }
};

LyngkTestCase.prototype.testStory14 = function () {
    var plateau = new Lyngk.Engine();
    var intersections = plateau.getIntersections();
    intersections[1].poserPiece(Lyngk.Color.BLUE);
    intersections[1].poserPiece(Lyngk.Color.RED);
    intersections[1].poserPiece(Lyngk.Color.GREEN);

    var pile_inter1 = intersections[1].getPile();

    assertTrue(pile_inter1[1].getColor() === Lyngk.Color.BLUE);
    assertTrue(pile_inter1[2].getColor() === Lyngk.Color.RED);
    assertTrue(pile_inter1[3].getColor() === Lyngk.Color.GREEN);

    for (var iter = 0; iter < intersections.length; iter++) {
        assertTrue(intersections[iter].getPileHeight() > 0);
        assertTrue(intersections[iter].getColorPile() === intersections[iter].getColorLastPiece());
    }
};

LyngkTestCase.prototype.testStory15 = function () {
    var plateau = new Lyngk.Engine();
    var coord_A3 = new Lyngk.Coordinates('A', 3);
    var coord_B3 = new Lyngk.Coordinates('B', 3);
    var inter_B3 = plateau.getIntersection(coord_B3);
    var inter_A3 = plateau.getIntersection(coord_A3);
    inter_A3.poserPiece(Lyngk.Color.GREEN);

    assertTrue(plateau.move(coord_A3, coord_B3));

    assertEquals(inter_B3.getColorPile(), Lyngk.Color.GREEN);
    assertEquals(inter_A3.getState(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory16 = function () {
    var plateau = new Lyngk.Engine();
    var coord_B2 = new Lyngk.Coordinates('B', 2);
    var coord_B3 = new Lyngk.Coordinates('B', 3);
    var inter_B2 = plateau.getIntersection(coord_B2);
    var inter_B3 = plateau.getIntersection(coord_B3);

    inter_B3.poserPiece(Lyngk.Color.BLUE);
    plateau.move(coord_B3, coord_B2);

    assertTrue(inter_B2.getPileHeight() === 3);
    assertTrue(inter_B2.getColorPile() === inter_B3.getColorLastPiece());
    assertTrue(inter_B3.getState() === Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory17 = function () {
    var plateau = new Lyngk.Engine();
    var coord_B3 = new Lyngk.Coordinates('B', 3);
    var coord_B4 = new Lyngk.Coordinates('B', 4);

    assertTrue(plateau.move(coord_B3, coord_B4));
    assertFalse(plateau.move(coord_B4, coord_B3));
};

LyngkTestCase.prototype.testStory18 = function () {
    var plateau = new Lyngk.Engine();
    var coord_C2 = new Lyngk.Coordinates('C', 2);
    var coord_B3 = new Lyngk.Coordinates('B', 3);

    assertFalse(plateau.move(coord_C2, coord_B3));
};

LyngkTestCase.prototype.testStory19 = function () {
    var plateau = new Lyngk.Engine();
    var coord_I7 = new Lyngk.Coordinates('I', 7);
    var coord_H6 = new Lyngk.Coordinates('H', 6);
    var coord_H5 = new Lyngk.Coordinates('H', 5);
    var coord_H8 = new Lyngk.Coordinates('H', 8);
    var coord_F5 = new Lyngk.Coordinates('F', 5);
    var coord_F3 = new Lyngk.Coordinates('F', 3);

    plateau.move(coord_I7, coord_H6);
    plateau.move(coord_H6, coord_H5);

    assertFalse(plateau.move(coord_H5, coord_H8));
    assertFalse(plateau.move(coord_H5, coord_F5));
    assertFalse(plateau.move(coord_H5, coord_F3));
};

LyngkTestCase.prototype.testStory20 = function () {
    var plateau = new Lyngk.Engine();
    var coord_B2 = new Lyngk.Coordinates('B', 2);
    var coord_C2 = new Lyngk.Coordinates('C', 2);
    var coord_D2 = new Lyngk.Coordinates('D', 2);
    var coord_E2 = new Lyngk.Coordinates('E', 2);
    var inter_B2 = plateau.getIntersection(coord_B2);
    var inter_D2 = plateau.getIntersection(coord_D2);
    inter_B2.poserPiece(Lyngk.Color.GREEN);
    inter_B2.poserPiece(Lyngk.Color.GREEN);

    assertTrue(plateau.move(coord_B2, coord_C2));
    assertTrue(plateau.move(coord_C2, coord_D2));

    assertEquals(inter_D2.getPileHeight(), 5);
    assertFalse(plateau.move(coord_D2, coord_E2));
};

LyngkTestCase.prototype.testStory21 = function() {
    var plateau = new Lyngk.Engine();
    var coord_A3 = new Lyngk.Coordinates('A', 3);
    var coord_B3 = new Lyngk.Coordinates('B', 3);
    var coord_C3 = new Lyngk.Coordinates('C', 3);
    plateau.move(coord_A3, coord_B3);

    assertFalse(plateau.move(coord_C3, coord_B3));
};

LyngkTestCase.prototype.testStory22 = function() {
    var plateau = new Lyngk.Engine();
    var coord_B5 = new Lyngk.Coordinates('B', 5);
    var coord_C5 = new Lyngk.Coordinates('C', 5);

    assertTrue(plateau.move(coord_B5, coord_C5));

    var coord_D6 = new Lyngk.Coordinates('D', 6);

    assertTrue(plateau.move(coord_C5, coord_D6));

    var coord_E6 = new Lyngk.Coordinates('E', 6);
    var coord_E7 = new Lyngk.Coordinates('E', 7);

    assertTrue(plateau.move(coord_E7, coord_E6));

    assertFalse(plateau.move(coord_E6, coord_D6));
};


LyngkTestCase.prototype.testStory23 = function() {
    var plateau = new Lyngk.Engine();

    var coord_G7 = new Lyngk.Coordinates('G', 7);
    var coord_G8 = new Lyngk.Coordinates('G', 8);

    assertTrue(plateau.move(coord_G7, coord_G8));

    var coord_G9 = new Lyngk.Coordinates('G', 9);

    assertFalse(plateau.move(coord_G8, coord_G9));

    var coord_D5 = new Lyngk.Coordinates('D', 5);
    var coord_D6 = new Lyngk.Coordinates('D', 6);
    var coord_D7 = new Lyngk.Coordinates('D', 7);
    var coord_E5 = new Lyngk.Coordinates('E', 5);
    assertTrue(plateau.move(coord_D6, coord_D7));
    assertTrue(plateau.move(coord_D7, coord_D5));
    assertFalse(plateau.move(coord_D5, coord_E5));
};

LyngkTestCase.prototype.testStory24 = function(){
  var plateau = new Lyngk.Engine();

  assertTrue(plateau.getCurrentPlayer() === Lyngk.Player.PLAYER1);
};

LyngkTestCase.prototype.testStory25 = function() {
    var plateau = new Lyngk.Engine();
    var coord_D6 = new Lyngk.Coordinates('D', 6);
    var coord_D7 = new Lyngk.Coordinates('D', 7);

    assertTrue(plateau.move(coord_D6, coord_D7));

    assertTrue(plateau.getCurrentPlayer() === Lyngk.Player.PLAYER2);
};