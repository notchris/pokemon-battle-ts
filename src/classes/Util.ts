import * as termkit from 'terminal-kit';

import AttackEffect from '../data/attackEffect.json';

import Pokemon from './Pokemon';
import Move from './Move';

const P = require('es6-promise').Promise;
const term = termkit.terminal;

// Exit process on keypress (Enter)
term.on('key', (name: any) => {
  if (name === 'ESCAPE' || name === 'ESC') {
    process.exit();
  }
});
// PokeAPI Endpoint
const api = 'https://pokeapi.co/api/v2';

// Register ENTER key as a way to prompt an advance
const enter = async (): Promise<any> => {
  term.gray(' [ENTER]');
  await (term as any).inputField().promise;
};

/**
 * Fix the atk/def effectiveness calculation
 * Created using the chart here: https://pokemondb.net/type/old
 */
const atkCalc = AttackEffect;
const defCalc: any = {};
Object.entries(atkCalc).forEach(([k, v]) => {
  Object.entries(v).forEach(([m, w]) => {
    if (!defCalc[m]) defCalc[m] = {};
    defCalc[m][k] = w;
  });
});

/**
 * Get a random integer
 */
function randInt(min: number, max: number): number {
  if (min < 1) min = 1;
  return Math.floor(Math.random() * max) + min;
}

/**
 * Get a random float
 */
function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Based on the attack damage type, calc the effect
 */
function calcTypeEffect(move: Move, target: any): any {
  let effect = 0.0;
  if (move.type === 'physical' || move.type === 'special') {
    effect = (atkCalc as any)[move.category][target];
  } else if (move.type === 'status') {
    effect = defCalc[move.category][target];
  }
  return effect;
}

/**
 * Based on the types of the target pokemon, calc the effectiveness multiplier
 */
function effectMultiplier(effectA: number, effectB: number): number {
  const effect = effectA + effectB;
  if (effectA === 0.0 || effectB === 0.0) {
    return 0.0;
  }
  if (effect === 1.0) {
    return 0.5;
  } else if (effect === 2.5) {
    return 1.0;
  } else {
    return effect;
  }
}

/**
 * Calc the damage of an attack on a pokemon
 */
function calcDamage(source: Pokemon, target: Pokemon, move: Move): any {
  // Source attack / target defense
  const ad = source.stats.attack / target.stats.defense;
  // Base pokemon damage
  const base = (((2 * source.level) / 5 + 2) * move.power * ad) / 50 + 2;

  // Effectivenss based on type(s)
  let effect = 1.0;
  if (target.types.length === 2) {
    const effectA = calcTypeEffect(move, target.types[0]);
    const effectB = calcTypeEffect(move, target.types[1]);
    effect = effectMultiplier(effectA, effectB);
  } else {
    effect = calcTypeEffect(move, target.types[0]);
  }

  // Multiplier values
  const targets = 1.0,
    weather = 1.0,
    critical = 1.0,
    random = randFloat(0.85, 1.0),
    stab = 1.0,
    burn = 1.0,
    other = 1.0;

  // Modifier (Sum of multipliers)
  const modifier =
    targets * weather * critical * random * stab * effect * burn * other;
  const dmg = base * modifier;
  return {
    target: target.name,
    targetLastHp: target.currentHp,
    targetHp: target.currentHp - dmg,
    damage: dmg,
    effectiveness: effect,
    move,
  };
}

/**
 * Parse a move from the pokeapi
 */
function parseMove(data: any): Move {
  return new Move(
    data.id,
    data.name,
    data.type.name,
    data['damage_class'].name,
    data.power,
    data.pp,
    data.accuracy,
    data.priority,
    data['stat_changes'].map((s: { stat: { name: any }; change: any }) => {
      return { stat: s.stat.name, change: s.change };
    }),
    data['effect_entries'][0].effect,
    data.meta,
  );
}

/**
 * Parse a pokemon from the pokeapi
 */
function parsePokemon(data: any): Pokemon {
  const stats = {};
  data.stats.forEach(
    (stat: { stat: { name: string | number }; base_stat: any }) => {
      (stats as any)[stat.stat.name] = stat.base_stat;
    },
  );

  const p = new Pokemon(
    data.id,
    data.name,
    10,
    data.weight,
    data.height,
    stats,
    data.types.map((t: { type: { name: any } }) => t.type.name),
    data.moves
      .filter(
        (m: { [x: string]: { [x: string]: { name: string } }[] }) =>
          (m as any)['version_group_details'][0]['level_learned_at'] <= 10 &&
          m['version_group_details'][0]['move_learn_method'].name ===
            'level-up',
      )
      .map((mo: { move: any }) => mo.move),
  );
  return p;
}

export {
  api,
  term,
  enter,
  randInt,
  randFloat,
  calcDamage,
  parseMove,
  parsePokemon,
};
