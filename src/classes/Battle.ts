import { term, enter, calcDamage } from './Util';
import Trainer from './Trainer';
import Move from './Move';

export default class Battle {
  trainerA: Trainer;
  trainerB: Trainer;
  lastMove?: Trainer;

  constructor(trainerA: Trainer, trainerB: Trainer) {
    this.trainerA = trainerA;
    this.trainerB = trainerB;
  }

  async start(): Promise<any> {
    term(`💬 ^GTRAINER ${this.trainerB.name} ^Wwants to battle!`);
    await enter();

    term(
      `\n💬 ^GTRAINER ${this.trainerB.name} ^Wsent out ^G${this.trainerB.pokemon[0].name}^W!`,
    );
    await enter();

    term(`\n💬 ^WGo! ^G${this.trainerA.pokemon[0].name}^W!`);
    await enter();

    term.clear();

    await this.action();
  }

  async action(): Promise<any> {
    const items = ['1. FIGHT', '2. PACK', '3. POKEMON', '4. RUN'];
    term.green(`Choose an option:`);
    term.singleColumnMenu(items, async (error, response) => {
      switch (response.selectedIndex) {
        case 0:
          await this.fight();
          break;
        case 1:
          console.log('PACK');
          break;
        case 2:
          console.log('POKEMON');
          break;
        case 3:
          console.log('RUN');
          break;
        default:
          break;
      }
    });
  }

  async fight(): Promise<any> {
    term.clear();
    term.green(`Which move will ${this.trainerA.active.name} use?`);
    const items = this.trainerA.active.moves.map(
      (move: Move, i: number) =>
        `${i + 1}. ${move.name.replace('-', ' ').toUpperCase()}`,
    );
    const moveMenu = term.singleColumnMenu(items, async (error, response) => {
      term.clear();
      await this.execStep(this.trainerA.active.moves[response.selectedIndex]);
    });

    // Listen for highlight change event on the move menu to update details table
    (moveMenu as any).on('highlight', (index: any) => {
      const move = this.trainerA.active.moves[index.highlightedIndex];
      term.nextLine(items.length - index.highlightedIndex);
      term.eraseDisplayBelow();

      term('\n');
      // Show the updated table with move details
      (term as any).table(
        [
          ['^BName', '^BType', '^BPP', '^BPower', '^BAccuracy', '^BEffect'],
          [
            move.name.replace('-', ' ').toUpperCase(),
            move.category.toUpperCase(),
            `${move.ppCurrent || '0'} / ${move.pp}`,
            move.power || '0',
            move.accuracy || 'N/A',
            move.effect.substring(0, 120),
          ],
        ],
        {
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
        },
      );
    });
  }

  comparePriority(moveA: Move, moveB: Move): Trainer | null {
    if (moveA.priority > moveB.priority) {
      return this.trainerA;
    } else if (moveB.priority > moveA.priority) {
      return this.trainerB;
    } else {
      return null;
    }
  }

  async execStep(move: Move): Promise<any> {
    // Select a random move from the opponent (and check PP).
    const movesWithPp = this.trainerB.active.moves.filter(
      (m: Move) => m.ppCurrent > 0,
    );
    const randomMove =
      movesWithPp[Math.floor(Math.random() * movesWithPp.length)];
    const prioritized = this.comparePriority(move, randomMove);

    let result;
    if (!this.lastMove) {
      if (prioritized === this.trainerA) {
        result = calcDamage(this.trainerA.active, this.trainerB.active, move);
        this.lastMove = this.trainerA;
      } else if (prioritized === this.trainerB) {
        result = calcDamage(
          this.trainerB.active,
          this.trainerA.active,
          randomMove,
        );
        this.lastMove = this.trainerB;
      } else {
        result = calcDamage(this.trainerA.active, this.trainerB.active, move);
        this.lastMove = this.trainerA;
      }
    } else if (this.lastMove === this.trainerA) {
      result = calcDamage(
        this.trainerB.active,
        this.trainerA.active,
        randomMove,
      );
      console.log('trainerA');
    } else if (this.lastMove === this.trainerB) {
      result = calcDamage(this.trainerA.active, this.trainerB.active, move);
      console.log('trainerB');
    }

    console.log(result);
    this.action();
  }
}
