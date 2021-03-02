"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Move = /** @class */ (function () {
    function Move(id, name, category, type, power, pp, accuracy, priority, statChanges, effect) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.type = type;
        this.power = power;
        this.pp = pp;
        this.ppCurrent = pp;
        this.accuracy = accuracy;
        this.priority = priority;
        this.statChanges = statChanges;
        this.effect = effect;
        return this;
    }
    return Move;
}());
exports.default = Move;
