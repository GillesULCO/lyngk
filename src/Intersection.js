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

    this.getPileHeight = function () {
        return pile.length;
    };

    this.getColorPile = function () {
        if (this.getPileHeight() > 0) {
            return pile[this.getPileHeight() - 1].getColor();
        }
        return false;
    };

    this.getPile = function () {
        return pile;
    };

    this.updateState = function () {
        var states = [
            Lyngk.State.VACANT, Lyngk.State.ONE_PIECE,
            Lyngk.State.STACK, Lyngk.State.STACK,
            Lyngk.State.STACK, Lyngk.State.FULL_STACK
        ];
        state = states[this.getPileHeight()];
    };

    this.setPile = function (newPile) {
        pile = newPile;
        this.updateState();
    };

    this.clearPile = function () {
        pile.splice(0, this.getPileHeight());
        this.updateState();
    };

    this.poserPiece = function (color) {
        var piece = new Lyngk.Piece(color);
        colorLastPiece = piece.getColor();
        pile.push(piece);
        this.updateState();
    };

    this.getLine = function () {
        return c.getLine();
    };

    this.getColumn = function () {
        return c.getColumn();
    };

};
