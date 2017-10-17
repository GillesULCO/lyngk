"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var colorLastPiece;
    var nb_pieces = 0;

    this.getState = function () {
        return state;
    };

    this.getColorLastPiece = function () {
        return colorLastPiece;
    };

    this.poserPiece = function (color) {
        var piece = new Lyngk.Piece(color);
        colorLastPiece = piece.getcolor();
        nb_pieces++;
        if (nb_pieces === 1) {
            state = Lyngk.State.ONE_PIECE;
        } else {
            if (nb_pieces > 1 && nb_pieces < 5) {
                state = Lyngk.State.STACK;
            } else {
                state = Lyngk.State.FULL_STACK;
            }
        }

    }


};
