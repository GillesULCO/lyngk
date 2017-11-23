"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Player = {PLAYER1: 0, PLAYER2: 1};

Lyngk.Engine = function () {
    var intersections = [];
    var nbPiecesForEachColor = [0, 0, 0, 0, 0, 0];
    var availableColors = [0, 1, 2, 3, 4, 5]; // 0 1 5 availableColros[random]
    var currentPlayer = Lyngk.Player.PLAYER1;

    this.getCurrentPlayer = function () {
        return currentPlayer;
    };

    this.majColors = function (availableColors) {
        var color;
        for (color = 0; color < availableColors.length; color += 1) {
            if (availableColors[color] !== Lyngk.Color.WHITE) {
                this.majArrayColors(color, 8);
            } else {
                this.majArrayColors(color, 3);
            }
        }
    };

    this.majArrayColors = function (color, maxPieces) {
        if (nbPiecesForEachColor[availableColors[color]] === maxPieces) {
            availableColors.splice(color, 1);
        }
    };

    this.getRandomColor = function () {
        var randomIndex = Math.floor(Math.random() * availableColors.length);
        var randomColor = availableColors[randomIndex];
        nbPiecesForEachColor[randomColor] += 1;

        return randomColor; //retourne l'id d'une couleur aléatoirement

    };

    this.initialize = function () {
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        var indexLetter, line, coord;
        for (indexLetter = 0; indexLetter < letters.length; indexLetter += 1) {
            for (line = 1; line < 10; line += 1) {
                coord = new Lyngk.Coordinates(letters[indexLetter], line);
                this.initializeInter(coord);
            }
        }
    };

    this.initializeInter = function (coord) {
        if (coord.isValid()) {
            var color = this.getRandomColor();
            var inter = new Lyngk.Intersection(coord);
            inter.poserPiece(color);
            this.majColors(availableColors);
            intersections.push(inter);
        }
    };

    this.initialize();

    this.getIntersections = function () {
        return intersections;
    };

    this.getIntersection = function (coord) {
        var inters = this.getIntersections();
        var indexInter;
        for (indexInter = 0; indexInter < inters.length; indexInter += 1) {
            if (
                inters[indexInter].getLine() === coord.getLine() &&
                inters[indexInter].getColumn() === coord.getColumn()
            ) {
                return inters[indexInter];
            }
        }
        return false;
    };

    this.pileHeightIsMax = function (pileHeight) {
        return pileHeight === 5;
    };

    this.sourcePileHeightLTdestPileHeight = function (source, dest) {
        if (dest === 1) {
            return false;
        }
        return source < dest;
    };

    this.getCoordVoisin = function (line, column, direction) {
        var voisinCoord, voisinInter = null;
        var voisins;
        do {
            voisins = [
                [line + 1, column],
                [line - 1, column],
                [line + 1, String.fromCharCode(column.charCodeAt(0) + 1)],
                [line, String.fromCharCode(column.charCodeAt(0) - 1)],
                [line, String.fromCharCode(column.charCodeAt(0) + 1)],
                [line - 1, String.fromCharCode(column.charCodeAt(0) - 1)]
            ];
            line = voisins[direction][0];
            column = voisins[direction][1];

            voisinCoord = new Lyngk.Coordinates(column, line);
            if (voisinCoord.isValid()) {
                voisinInter = this.getIntersection(voisinCoord);
            }else{
                return null;
            }

        } while (voisinInter === null || voisinInter.getState() === Lyngk.State.VACANT);

        return voisinCoord;

    };

    this.checkDirections = function (source, dest) {
        var voisinCoord, dir;
        var currentLine = source.getLine();
        var currentColumn = source.getColumn();
        for (dir = 0; dir < 6; dir += 1) {
            voisinCoord = this.getCoordVoisin(currentLine, currentColumn, dir);
            if (
                voisinCoord !== null &&
                voisinCoord.isValid() &&
                voisinCoord.equal(dest) &&
                !source.equal(dest)
            ) {
                return true;
            }
        }
        return false;
    };

    this.sameColorsPieces = function (piece1, piece2) {
        var color1 = piece1.getColor();
        var color2 = piece2.getColor();
        return color1 === color2;
    };

    this.sameColorInTwoPiles = function (sPile, dPile) {
        var indexS, indexD;
        for (indexS = 0; indexS < sPile.length; indexS += 1) {
            if (sPile[indexS].getColor() === Lyngk.Color.WHITE) {
                continue;
            }
            for (indexD = 0; indexD < dPile.length; indexD += 1) {
                if (dPile[indexD].getColor() === Lyngk.Color.WHITE) {
                    continue;
                }
                if (this.sameColorsPieces(sPile[indexS], dPile[indexD])) {
                    return true;
                }
            }

        }
        return false;
    };

    this.checkPileHeight = function (sPile, dPile) {
        var SPileHeight = sPile.length;
        var DPileHeight = dPile.length;
        return !(
            this.pileHeightIsMax(SPileHeight) ||
            this.sourcePileHeightLTdestPileHeight(SPileHeight, DPileHeight)
        );
    };

    this.isMoveValid = function (source, dest) {
        var sPile = this.getIntersection(source).getPile();
        var dPile = this.getIntersection(dest).getPile();
        if (
            !this.checkPileHeight(sPile, dPile) ||
            this.sameColorInTwoPiles(sPile, dPile)
        ) {
            return false;
        }

        return this.checkDirections(source, dest);
    };

    this.move = function (source, dest) {
        var inter_dest = this.getIntersection(dest);
        if (
            !this.isMoveValid(source, dest) ||
            inter_dest.getState() === Lyngk.State.VACANT
        ) {
            return false;
        }

        var inter_source = this.getIntersection(source);

        inter_dest.setPile(inter_dest.getPile().concat(inter_source.getPile()));
        inter_source.clearPile();
        return true;
    };

};
