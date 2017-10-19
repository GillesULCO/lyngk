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
    }


};
