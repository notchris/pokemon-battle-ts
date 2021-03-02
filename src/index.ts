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
const P = require('es6-promise').Promise;

import {
  api,
  term,
  enter,
  randInt,
  parsePokemon,
  parseMove,
} from './classes/Util';
import Pokemon from './classes/Pokemon';
//import Move from './classes/Move';
import Trainer from './classes/Trainer';
import Battle from './classes/Battle';
import fetch, { Response } from 'node-fetch';

// Create promise array of random pokemon
const arr: Promise<Response>[] = [];
for (let i = 0; i < 6; i += 1) {
  arr.push(fetch(`${api}/pokemon/${randInt(1, 151)}`));
}

const newBattle = async (): Promise<any> => {
  const b = await P.all(arr)
    .then((responses: any[]) => {
      return P.all(
        responses.map(response => {
          return response.json();
        }),
      );
    })
    .then((data: any) => {
      const pokemonArr: Pokemon[] = [];
      data.forEach((p: any) => {
        pokemonArr.push(parsePokemon(p));
      });

      const moveArr: any[] = [];
      pokemonArr.forEach(p => {
        p.moves.forEach((m: any) => moveArr.push(fetch(m.url)));
      });

      return P.all(moveArr)
        .then((resps: any) => {
          return P.all(
            resps.map((resp: any) => {
              return resp.json();
            }),
          );
        })
        .then((d: any) => {
          for (let i = 0; i < pokemonArr.length; i += 1) {
            for (let j = 0; j < pokemonArr[i].moves.length; j += 1) {
              pokemonArr[i].moves[j] = parseMove(
                d.filter(
                  (mov: any) => mov.name === pokemonArr[i].moves[j].name,
                )[0],
              );
            }
          }
          const trainerA = new Trainer('ASH', pokemonArr.slice(0, 3));
          const trainerB = new Trainer('GARY', pokemonArr.slice(3, 6));
          return new Battle(trainerA, trainerB);
        })
        .catch((error: any) => {
          console.error('Unable to load move data for pokemon!', error);
        });
    })
    .catch((error: any) => {
      console.error('Unable to load pokemon data!', error);
    });
  return b;
};

(async (): Promise<any> => {
  term.clear();

  // Show loading indicator while battle is loading data
  const spinner = await (term as any).spinner('impulse');
  term(' Loading data for new battle...\n');
  const battle: Battle = await newBattle();
  spinner.hidden = true;
  spinner.disabled = true;

  // Show a table with the battle overview
  (term as any).table(
    [
      ['', '^BPlayer', '^ROpponent'],
      ['^GName', battle.trainerA.name, battle.trainerB.name],
      [
        '^GPokemon',
        battle.trainerA.pokemon.map((pkmn: Pokemon) => pkmn.name).join('\n'),
        battle.trainerB.pokemon.map((pkmn: Pokemon) => pkmn.name).join('\n'),
      ],
      ['^GBadges', 'None', 'None'],
    ],
    {
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
    },
  );

  // Prompt to start the battle
  term.yellow('Press [ENTER] to start the battle.');
  await enter();
  term.clear();

  // Start the battle
  await battle.start();
})();
