"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];
    var nb_black = 0;
    var nb_ivory = 0;
    var nb_blue = 0;
    var nb_red = 0;
    var nb_green = 0;
    var nb_white = 0;
    var colors = [0, 1, 2, 3, 4, 5]; //tableau des id des couleurs 0-->BLACK, 1--> IVORY etc ...

    this.majColors = function (colors) {
        if (nb_black === 8 && colors.indexOf(Lyngk.Color.BLACK) !== -1) //si le nombre de pieces noires est 8 et la couleur n'a pas encore été supprimé
            colors.splice(colors.indexOf(Lyngk.Color.BLACK), 1); //on supprime l'id qui correspond au noir (ie 0)

        if (nb_ivory === 8 && colors.indexOf(Lyngk.Color.IVORY) !== -1)
            colors.splice(colors.indexOf(Lyngk.Color.IVORY), 1);

        if (nb_blue === 8 && colors.indexOf(Lyngk.Color.BLUE) !== -1)
            colors.splice(colors.indexOf(Lyngk.Color.BLUE), 1);

        if (nb_red === 8 && colors.indexOf(Lyngk.Color.RED) !== -1)
            colors.splice(colors.indexOf(Lyngk.Color.RED), 1);

        if (nb_green === 8 && colors.indexOf(Lyngk.Color.GREEN) !== -1)
            colors.splice(colors.indexOf(Lyngk.Color.GREEN), 1);

        if (nb_white === 3 && colors.indexOf(Lyngk.Color.WHITE) !== -1)
            colors.splice(colors.indexOf(Lyngk.Color.WHITE), 1);
    };

    this.getRandomColor = function () {

        var randomColor = colors[Math.floor((Math.random() * colors.length))];
        switch (randomColor) {
            case Lyngk.Color.BLACK :
                nb_black++;
                break;
            case Lyngk.Color.IVORY :
                nb_ivory++;
                break;
            case Lyngk.Color.RED :
                nb_red++;
                break;
            case Lyngk.Color.BLUE :
                nb_blue++;
                break;
            case Lyngk.Color.WHITE :
                nb_white++;
                break;
            case Lyngk.Color.GREEN :
                nb_green++;
                break;
        }

        return randomColor; //retourne l'id d'une couleur aléatoirement

    };

    this.initialize = function () {
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        for (var c = 0; c < letters.length; c++) {
            for (var l = 1; l < 10; l++) {
                var coord = new Lyngk.Coordinates(letters[c], l);
                if (coord.is_valid()) {
                    var color = this.getRandomColor();
                    var inter = new Lyngk.Intersection(coord);
                    inter.poserPiece(color);
                    this.majColors(colors); //met a jour le tableau colors pour n'avoir que les ids des couleurs disponibles
                    intersections.push(inter);
                }
            }
        }
    };

    this.initialize();

    this.getIntersections = function () {
        return intersections;
    };

    this.getIntersection = function (coordonnee) {
        var intersections = this.getIntersections();
        for (var i = 0; i < intersections.length; i++) {
            if (intersections[i].getLine() === coordonnee.getLine() && intersections[i].getColumn() === coordonnee.getColumn())
                return intersections[i];
        }
        return false;
    };

    this.isMoveValid = function (source, dest) {
        var currentLigne;
        var currentColonne;

        if(this.getIntersection(source).getPileHeight() === 5) return false;

        if(this.getIntersection(source).getPileHeight() === 1 && this.getIntersection(dest).getPileHeight() > 1) return false;

        for (var i = 0; i < 6; i++) { //0 haut ; 1 bas ; 2 diagonale haut droite ; 3 diagonale haut gauche ; 4 diagonale bas droite ; 5 diagonale bas gauche
            var delta = 1;
            var tempPotentielVoisinIntersection;
            currentLigne = source.getLine();
            currentColonne = source.getColumn();
            do {
                switch (i) {
                    case 0 :
                        currentLigne += delta;
                        break;
                    case 1 :
                        currentLigne -= delta;
                        break;
                    case 2 :
                        currentLigne += delta;
                        currentColonne = String.fromCharCode((currentColonne.charCodeAt(0)) + delta);
                        break;
                    case 3 :
                        currentColonne = String.fromCharCode((currentColonne.charCodeAt(0)) - delta);
                        break;
                    case 4 :
                        currentColonne = String.fromCharCode((currentColonne.charCodeAt(0)) + delta);
                        break;
                    case 5 :
                        currentLigne -= delta;
                        currentColonne = String.fromCharCode((currentColonne.charCodeAt(0)) - delta);
                        break;
                }

                var tempPotentielVoisinCoordinate = new Lyngk.Coordinates(currentColonne, currentLigne);
                if (tempPotentielVoisinCoordinate.is_valid()) {
                    tempPotentielVoisinIntersection = this.getIntersection(tempPotentielVoisinCoordinate);
                }

            } while (tempPotentielVoisinIntersection && tempPotentielVoisinIntersection === Lyngk.State.VACANT);

            if (tempPotentielVoisinCoordinate.is_valid() && tempPotentielVoisinCoordinate.equal(dest)) {
                return true;
            }
        }
        return false;
    };

    this.move = function (source, dest) {
        if (source.equal(dest))
            return false;

        if (!this.isMoveValid(source, dest)) {
            return false;
        }


        var inter_dest = this.getIntersection(dest);
        if (inter_dest.getState() === Lyngk.State.VACANT)
            return false;

        var inter_source = this.getIntersection(source);

        inter_dest.setPile(inter_dest.getPile().concat(inter_source.getPile()));
        inter_source.clearPile();
        return true;
    };

};
