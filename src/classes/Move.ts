export default class Move {
  id: number;
  name: string;
  category: string;
  type: string;
  power: number;
  pp: number;
  ppCurrent: number;
  accuracy: number;
  priority: number;
  statChanges: any;
  effect: any;
  meta: any;

  constructor(
    id: number,
    name: string,
    category: string,
    type: string,
    power: number,
    pp: number,
    accuracy: number,
    priority: number,
    statChanges: any,
    effect: any,
    meta: any,
  ) {
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
    this.meta = meta;

    return this;
  }
}
