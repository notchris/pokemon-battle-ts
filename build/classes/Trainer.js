"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trainer = /** @class */ (function () {
    function Trainer(name, pokemon) {
        this.name = name;
        this.pokemon = pokemon;
        this.active = pokemon[0];
        return this;
    }
    return Trainer;
}());
exports.default = Trainer;
