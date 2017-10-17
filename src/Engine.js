"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    this.initialize = function () {
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        for (var c = 0; c < letters.length; c++) {
            for (var l = 1; l < 10; l++) {
                var coord = new Lyngk.Coordinates(letters[c], l);
                if (coord.is_valid()) {
                    var inter = new Lyngk.Intersection(coord);
                    inter.poserPiece("blanc");
                    intersections.push(inter);
                }
            }
        }
    };

    this.initialize();


    this.getIntersections = function () {
        return intersections;
    }


};
