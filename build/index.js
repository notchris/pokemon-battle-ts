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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/**
███╗░░██╗░█████╗░████████╗░█████╗░░█████╗░██████╗░██████╗░
████╗░██║██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
██╔██╗██║██║░░██║░░░██║░░░██║░░╚═╝██║░░██║██████╔╝██████╔╝
██║╚████║██║░░██║░░░██║░░░██║░░██╗██║░░██║██╔══██╗██╔═══╝░
██║░╚███║╚█████╔╝░░░██║░░░╚█████╔╝╚█████╔╝██║░░██║██║░░░░░
╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░░╚════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░

ENV: SANDBOX | NODE
USR: NOTCHRIS
PRJ: POKEMON βATTLE
VRS: 1.0.0
**/
var P = require('es6-promise').Promise;
var Util_1 = require("./classes/Util");
//import Move from './classes/Move';
var Trainer_1 = __importDefault(require("./classes/Trainer"));
var Battle_1 = __importDefault(require("./classes/Battle"));
var node_fetch_1 = __importDefault(require("node-fetch"));
// Create promise array of random pokemon
var arr = [];
for (var i = 0; i < 6; i += 1) {
    arr.push(node_fetch_1.default(Util_1.api + "/pokemon/" + Util_1.randInt(1, 151)));
}
var newBattle = function () { return __awaiter(void 0, void 0, void 0, function () {
    var b;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, P.all(arr)
                    .then(function (responses) {
                    return P.all(responses.map(function (response) {
                        return response.json();
                    }));
                })
                    .then(function (data) {
                    var pokemonArr = [];
                    data.forEach(function (p) {
                        pokemonArr.push(Util_1.parsePokemon(p));
                    });
                    var moveArr = [];
                    pokemonArr.forEach(function (p) {
                        p.moves.forEach(function (m) { return moveArr.push(node_fetch_1.default(m.url)); });
                    });
                    return P.all(moveArr)
                        .then(function (resps) {
                        return P.all(resps.map(function (resp) {
                            return resp.json();
                        }));
                    })
                        .then(function (d) {
                        var _loop_1 = function (i) {
                            var _loop_2 = function (j) {
                                pokemonArr[i].moves[j] = Util_1.parseMove(d.filter(function (mov) { return mov.name === pokemonArr[i].moves[j].name; })[0]);
                            };
                            for (var j = 0; j < pokemonArr[i].moves.length; j += 1) {
                                _loop_2(j);
                            }
                        };
                        for (var i = 0; i < pokemonArr.length; i += 1) {
                            _loop_1(i);
                        }
                        var trainerA = new Trainer_1.default('ASH', pokemonArr.slice(0, 3));
                        var trainerB = new Trainer_1.default('GARY', pokemonArr.slice(3, 6));
                        return new Battle_1.default(trainerA, trainerB);
                    })
                        .catch(function (error) {
                        console.error('Unable to load move data for pokemon!', error);
                    });
                })
                    .catch(function (error) {
                    console.error('Unable to load pokemon data!', error);
                })];
            case 1:
                b = _a.sent();
                return [2 /*return*/, b];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var spinner, battle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Util_1.term.clear();
                return [4 /*yield*/, Util_1.term.spinner('impulse')];
            case 1:
                spinner = _a.sent();
                Util_1.term(' Loading data for new battle...\n');
                return [4 /*yield*/, newBattle()];
            case 2:
                battle = _a.sent();
                spinner.hidden = true;
                spinner.disabled = true;
                // Show a table with the battle overview
                Util_1.term.table([
                    ['', '^BPlayer', '^ROpponent'],
                    ['^GName', battle.trainerA.name, battle.trainerB.name],
                    [
                        '^GPokemon',
                        battle.trainerA.pokemon.map(function (pkmn) { return pkmn.name; }).join('\n'),
                        battle.trainerB.pokemon.map(function (pkmn) { return pkmn.name; }).join('\n'),
                    ],
                    ['^GBadges', 'None', 'None'],
                ], {
                    hasBorder: true,
                    contentHasMarkup: true,
                    borderChars: 'lightRounded',
                    borderAttr: { color: 'gray' },
                    textAttr: { bgColor: 'default' },
                    firstCellTextAttr: { bgColor: 'black' },
                    firstRowTextAttr: { bgColor: 'black' },
                    firstColumnTextAttr: { bgColor: 'default' },
                    width: 60,
                    fit: true,
                });
                // Prompt to start the battle
                Util_1.term.yellow('Press [ENTER] to start the battle.');
                return [4 /*yield*/, Util_1.enter()];
            case 3:
                _a.sent();
                Util_1.term.clear();
                // Start the battle
                return [4 /*yield*/, battle.start()];
            case 4:
                // Start the battle
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
