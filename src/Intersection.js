"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var colorLastPiece;
    var pile = [];

    this.getState = function () {
        return state;
    };

    this.getNbPieces = function () {
        return pile.length;
    };

    this.getColorLastPiece = function () {
        return colorLastPiece;
    };

    this.getColorPile = function () {
        return pile[pile.length - 1].getColor();
    };

    this.getPile = function () {
        return pile;
    };

    this.getPileHeight = function () {
        return pile.length;
    };

    this.poserPiece = function (color) {
        var piece = new Lyngk.Piece(color);
        colorLastPiece = piece.getColor();
        pile.push(piece);
        if (this.getPileHeight() === 1) {
            state = Lyngk.State.ONE_PIECE;
        } else {
            if (this.getPileHeight() > 1 && this.getPileHeight() < 5) {
                state = Lyngk.State.STACK;
            } else {
                state = Lyngk.State.FULL_STACK;
            }
        }

    }
};
