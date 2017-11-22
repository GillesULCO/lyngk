"use strict";

Lyngk.Coordinates = function (c, l) {
    var line = l;
    var column = c;
    var validCoordinates = [
        "C1", "B2", "C2", "D2", "E2", "A3", "B3", "C3",
        "D3", "E3", "F3", "G3", "B4", "C4", "D4", "E4", "F4", "G4",
        "B5", "C5", "D5", "E5", "F5", "G5", "H5", "C6", "D6", "E6",
        "F6", "G6", "H6", "C7", "D7", "E7", "F7", "G7", "H7", "I7",
        "E8", "F8", "G8", "H8", "G9"
    ];

    this.isValid = function () {
        var coordinate = column + line;
        return (validCoordinates.indexOf(coordinate) !== -1);
    };

    this.toString = function () {
        return column + line;
    };

    this.getFormatCoord = function () {
        if (this.isValid()) {
            return this.toString();
        } else {
            return 'invalid';
        }
    };

    this.clone = function () {
        return new Lyngk.Coordinates(column, line);
    };

    this.getHash = function () {
        var hash = 0;
        hash += column.charCodeAt(0);
        hash = hash.toString();
        hash += line;
        return parseInt(hash);
    };

    this.getLine = function () {
        return line;
    };

    this.getColumn = function () {
        return column;
    };

    this.equal = function (coord) {
        if (this.getLine() === coord.getLine()) {
            if (this.getColumn() === coord.getColumn()) {
                return true;
            }
        }
        return false;
    };
};
