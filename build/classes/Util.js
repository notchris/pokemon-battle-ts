"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.parsePokemon = exports.parseMove = exports.calcDamage = exports.randFloat = exports.randInt = exports.enter = exports.term = exports.api = void 0;
var termkit = __importStar(require("terminal-kit"));
var attackEffect_json_1 = __importDefault(require("../data/attackEffect.json"));
var Pokemon_1 = __importDefault(require("./Pokemon"));
var Move_1 = __importDefault(require("./Move"));
var P = require('es6-promise').Promise;
var term = termkit.terminal;
exports.term = term;
// Exit process on keypress (Enter)
term.on('key', function (name) {
    if (name === 'ESCAPE' || name === 'ESC') {
        process.exit();
    }
});
// PokeAPI Endpoint
var api = 'https://pokeapi.co/api/v2';
exports.api = api;
// Register ENTER key as a way to prompt an advance
var enter = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                term.gray(' [ENTER]');
                return [4 /*yield*/, term.inputField().promise];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.enter = enter;
/**
 * Fix the atk/def effectiveness calculation
 * Created using the chart here: https://pokemondb.net/type/old
 */
var atkCalc = attackEffect_json_1.default;
var defCalc = {};
Object.entries(atkCalc).forEach(function (_a) {
    var k = _a[0], v = _a[1];
    Object.entries(v).forEach(function (_a) {
        var m = _a[0], w = _a[1];
        if (!defCalc[m])
            defCalc[m] = {};
        defCalc[m][k] = w;
    });
});
/**
 * Get a random integer
 */
function randInt(min, max) {
    if (min < 1)
        min = 1;
    return Math.floor(Math.random() * max) + min;
}
exports.randInt = randInt;
/**
 * Get a random float
 */
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randFloat = randFloat;
/**
 * Based on the attack damage type, calc the effect
 */
function calcTypeEffect(move, target) {
    var effect = 0.0;
    if (move.type === 'physical' || move.type === 'special') {
        effect = atkCalc[move.category][target];
    }
    else if (move.type === 'status') {
        effect = defCalc[move.category][target];
    }
    return effect;
}
/**
 * Based on the types of the target pokemon, calc the effectiveness multiplier
 */
function effectMultiplier(effectA, effectB) {
    var effect = effectA + effectB;
    if (effectA === 0.0 || effectB === 0.0) {
        return 0.0;
    }
    if (effect === 1.0) {
        return 0.5;
    }
    else if (effect === 2.5) {
        return 1.0;
    }
    else {
        return effect;
    }
}
/**
 * Calc the damage of an attack on a pokemon
 */
function calcDamage(source, target, move) {
    // Source attack / target defense
    var ad = source.stats.attack / target.stats.defense;
    // Base pokemon damage
    var base = (((2 * source.level) / 5 + 2) * move.power * ad) / 50 + 2;
    // Effectivenss based on type(s)
    var effect = 1.0;
    if (target.types.length === 2) {
        var effectA = calcTypeEffect(move, target.types[0]);
        var effectB = calcTypeEffect(move, target.types[1]);
        effect = effectMultiplier(effectA, effectB);
    }
    else {
        effect = calcTypeEffect(move, target.types[0]);
    }
    // Multiplier values
    var targets = 1.0, weather = 1.0, critical = 1.0, random = randFloat(0.85, 1.0), stab = 1.0, burn = 1.0, other = 1.0;
    // Modifier (Sum of multipliers)
    var modifier = targets * weather * critical * random * stab * effect * burn * other;
    var dmg = base * modifier;
    return {
        target: target.name,
        targetLastHp: target.currentHp,
        targetHp: target.currentHp - dmg,
        damage: dmg,
        effectiveness: effect,
        move: move,
    };
}
exports.calcDamage = calcDamage;
/**
 * Parse a move from the pokeapi
 */
function parseMove(data) {
    return new Move_1.default(data.id, data.name, data.type.name, data['damage_class'].name, data.power, data.pp, data.accuracy, data.priority, data['stat_changes'].map(function (s) {
        return { stat: s.stat.name, change: s.change };
    }), data['effect_entries'][0].effect);
}
exports.parseMove = parseMove;
/**
 * Parse a pokemon from the pokeapi
 */
function parsePokemon(data) {
    var stats = {};
    data.stats.forEach(function (stat) {
        stats[stat.stat.name] = stat.base_stat;
    });
    var p = new Pokemon_1.default(data.id, data.name, 10, data.weight, data.height, stats, data.types.map(function (t) { return t.type.name; }), data.moves
        .filter(function (m) {
        return m['version_group_details'][0]['level_learned_at'] <= 10 &&
            m['version_group_details'][0]['move_learn_method'].name ===
                'level-up';
    })
        .map(function (mo) { return mo.move; }));
    return p;
}
exports.parsePokemon = parsePokemon;
