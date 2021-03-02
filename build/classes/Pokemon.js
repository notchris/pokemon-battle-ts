"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pokemon = /** @class */ (function () {
    function Pokemon(id, name, level, weight, height, stats, types, moves) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.xp = this.calcXp(this.level);
        this.weight = weight;
        this.height = height;
        this.stats = stats;
        this.currentHp = stats.hp;
        this.types = types;
        this.moves = moves;
        return this;
    }
    Pokemon.prototype.calcXp = function (l) {
        return 1.2 * Math.pow(l, 3) - 15 * Math.pow(l, 2) + 100 * l - 140;
    };
    Pokemon.prototype.calcNextLevel = function () {
        return Math.floor(this.calcXp(this.level + 1) - this.xp);
    };
    return Pokemon;
}());
exports.default = Pokemon;
