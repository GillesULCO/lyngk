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
        if (nb_pieces === 0) {
            state = Lyngk.State.ONE_PIECE;
        }
        nb_pieces++;
    }


};
