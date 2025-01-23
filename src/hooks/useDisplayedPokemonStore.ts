import { create } from "zustand";
import Pokemon from "../components/Pokemon";

type useDisplayedPokemonStoreState = {
  displayedPokemon: undefined | Pokemon;
  updateDisplayedPokemon: (newPokemon: Pokemon) => void;
};

const useDisplayedPokemonStore = create<useDisplayedPokemonStoreState>(
  (set) => ({
    displayedPokemon: undefined,
    updateDisplayedPokemon: (newPokemon: Pokemon) =>
      set({ displayedPokemon: newPokemon }),
  })
);

export default useDisplayedPokemonStore;
