"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Battle = /** @class */ (function () {
    function Battle(trainerA, trainerB) {
        this.trainerA = trainerA;
        this.trainerB = trainerB;
    }
    Battle.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Util_1.term("\uD83D\uDCAC ^GTRAINER " + this.trainerB.name + " ^Wwants to battle!");
                        return [4 /*yield*/, Util_1.enter()];
                    case 1:
                        _a.sent();
                        Util_1.term("\n\uD83D\uDCAC ^GTRAINER " + this.trainerB.name + " ^Wsent out ^G" + this.trainerB.pokemon[0].name + "^W!");
                        return [4 /*yield*/, Util_1.enter()];
                    case 2:
                        _a.sent();
                        Util_1.term("\n\uD83D\uDCAC ^WGo! ^G" + this.trainerA.pokemon[0].name + "^W!");
                        return [4 /*yield*/, Util_1.enter()];
                    case 3:
                        _a.sent();
                        Util_1.term.clear();
                        return [4 /*yield*/, this.action()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Battle.prototype.action = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            var _this = this;
            return __generator(this, function (_a) {
                items = ['1. FIGHT', '2. PACK', '3. POKEMON', '4. RUN'];
                Util_1.term.green("Choose an option:");
                Util_1.term.singleColumnMenu(items, function (error, response) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = response.selectedIndex;
                                switch (_a) {
                                    case 0: return [3 /*break*/, 1];
                                    case 1: return [3 /*break*/, 3];
                                    case 2: return [3 /*break*/, 4];
                                    case 3: return [3 /*break*/, 5];
                                }
                                return [3 /*break*/, 6];
                            case 1: return [4 /*yield*/, this.fight()];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 7];
                            case 3:
                                console.log('PACK');
                                return [3 /*break*/, 7];
                            case 4:
                                console.log('POKEMON');
                                return [3 /*break*/, 7];
                            case 5:
                                console.log('RUN');
                                return [3 /*break*/, 7];
                            case 6: return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Battle.prototype.fight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, moveMenu;
            var _this = this;
            return __generator(this, function (_a) {
                Util_1.term.clear();
                Util_1.term.green("Which move will " + this.trainerA.active.name + " use?");
                items = this.trainerA.active.moves.map(function (move, i) {
                    return i + 1 + ". " + move.name.replace('-', ' ').toUpperCase();
                });
                moveMenu = Util_1.term.singleColumnMenu(items, function (error, response) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                Util_1.term.clear();
                                return [4 /*yield*/, this.execStep(this.trainerA.active.moves[response.selectedIndex])];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // Listen for highlight change event on the move menu to update details table
                moveMenu.on('highlight', function (index) {
                    var move = _this.trainerA.active.moves[index.highlightedIndex];
                    Util_1.term.nextLine(items.length - index.highlightedIndex);
                    Util_1.term.eraseDisplayBelow();
                    Util_1.term('\n');
                    // Show the updated table with move details
                    Util_1.term.table([
                        ['^BName', '^BType', '^BPP', '^BPower', '^BAccuracy', '^BEffect'],
                        [
                            move.name.replace('-', ' ').toUpperCase(),
                            move.category.toUpperCase(),
                            (move.ppCurrent || '0') + " / " + move.pp,
                            move.power || '0',
                            move.accuracy || 'N/A',
                            move.effect.substring(0, 120),
                        ],
                    ], {
                        hasBorder: true,
                        contentHasMarkup: true,
                        borderChars: 'lightRounded',
                        borderAttr: { color: 'gray' },
                        textAttr: { bgColor: 'default' },
                        firstCellTextAttr: { bgColor: 'black' },
                        firstRowTextAttr: { bgColor: 'black' },
                        firstColumnTextAttr: {},
                        width: 80,
                        fit: false,
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    Battle.prototype.comparePriority = function (moveA, moveB) {
        if (moveA.priority > moveB.priority) {
            return this.trainerA;
        }
        else if (moveB.priority > moveA.priority) {
            return this.trainerB;
        }
        else {
            return null;
        }
    };
    Battle.prototype.execStep = function (move) {
        return __awaiter(this, void 0, void 0, function () {
            var movesWithPp, randomMove, prioritized, result;
            return __generator(this, function (_a) {
                movesWithPp = this.trainerB.active.moves.filter(function (m) { return m.ppCurrent > 0; });
                randomMove = movesWithPp[Math.floor(Math.random() * movesWithPp.length)];
                prioritized = this.comparePriority(move, randomMove);
                if (!this.lastMove) {
                    if (prioritized === this.trainerA) {
                        result = Util_1.calcDamage(this.trainerA.active, this.trainerB.active, move);
                        this.lastMove = this.trainerA;
                    }
                    else if (prioritized === this.trainerB) {
                        result = Util_1.calcDamage(this.trainerB.active, this.trainerA.active, randomMove);
                        this.lastMove = this.trainerB;
                    }
                    else {
                        result = Util_1.calcDamage(this.trainerA.active, this.trainerB.active, move);
                        this.lastMove = this.trainerA;
                    }
                }
                else if (this.lastMove === this.trainerA) {
                    result = Util_1.calcDamage(this.trainerB.active, this.trainerA.active, randomMove);
                    console.log('trainerA');
                }
                else if (this.lastMove === this.trainerB) {
                    result = Util_1.calcDamage(this.trainerA.active, this.trainerB.active, move);
                    console.log('trainerB');
                }
                console.log(result);
                this.action();
                return [2 /*return*/];
            });
        });
    };
    return Battle;
}());
exports.default = Battle;
