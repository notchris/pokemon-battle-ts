import Pokemon from './Pokemon';

export default class Trainer {
  name: string;
  pokemon: Pokemon[];
  active: Pokemon;

  constructor(name: string, pokemon: Pokemon[]) {
    this.name = name;
    this.pokemon = pokemon;
    this.active = pokemon[0];

    return this;
  }
}
