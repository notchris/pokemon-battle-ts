export default class Pokemon {
  id: number;
  name: string;
  level: number;
  weight: number;
  height: number;
  stats: any;
  types: any;
  moves: any;
  xp: number;
  currentHp: number;

  constructor(
    id: number,
    name: string,
    level: number,
    weight: number,
    height: number,
    stats: any,
    types: any,
    moves: any,
  ) {
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

  public calcXp(l: number): number {
    return 1.2 * Math.pow(l, 3) - 15 * Math.pow(l, 2) + 100 * l - 140;
  }

  public calcNextLevel(): number {
    return Math.floor(this.calcXp(this.level + 1) - this.xp);
  }
}
