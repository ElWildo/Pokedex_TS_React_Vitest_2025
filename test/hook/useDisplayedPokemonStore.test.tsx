import { act, renderHook } from "@testing-library/react";
import useDisplayedPokemonStore from "../../src/hooks/useDisplayedPokemonStore";
import Pokemon from "../../src/components/Pokemon";

const dummyPokemon: Pokemon = new Pokemon({
  id: "0",
  name: "Pokemon_Name",
  sprites: {
    front_default: "Pokemon_Sprite",
  },
  types: [{ type: { name: "Pokemon_Type" } }],
  url: "https://Pokemon_url",
});

describe("useDisplayedPokemonStore", () => {
  it("Should update displayedPokemon", () => {
    const { result } = renderHook(() => useDisplayedPokemonStore());

    expect(result.current.displayedPokemon).toBe(undefined);

    act(() => result.current.updateDisplayedPokemon(dummyPokemon));

    expect(result.current.displayedPokemon).toEqual(dummyPokemon);
  });
});
