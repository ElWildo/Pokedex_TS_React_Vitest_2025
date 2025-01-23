import miss from "../assets/miss.png";

type PokemonData = {
  id: string;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: { type: { name: string } }[];
  url: string;
};

class Pokemon {
  id: string;
  name: string;
  sprite: string;
  type: string;
  url: string;

  constructor(data: PokemonData) {
    this.id = data.id;
    this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    this.sprite = data.sprites.front_default
      ? data.sprites.front_default
      : miss;
    this.type = data.types
      .map(
        (typeEl) =>
          typeEl.type.name.charAt(0).toUpperCase() + typeEl.type.name.slice(1)
      )
      .join(", ");
    this.url = data.url;
  }
}

export default Pokemon;
