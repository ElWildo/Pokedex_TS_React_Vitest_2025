import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokeCell from "../../src/components/Pokecell";
import useDisplayedPokemonStore from "../../src/hooks/useDisplayedPokemonStore";
import type * as ZustandExportedTypes from "zustand";
import { Mock, vi } from "vitest";

vi.mock("../../src/hooks/useDisplayedPokemonStore", async () => {
  const zustand = await vi.importActual<typeof ZustandExportedTypes>("zustand");

  const mockStore = {
    displayedPokemon: undefined,
    updateDisplayedPokemon: vi.fn(),
  };

  return { __esModule: true, default: zustand.create(() => mockStore) };
});

global.fetch = vi.fn(() => {
  const mockResponse = {
    id: "0",
    name: "Pokemon_Name",
    sprites: {
      front_default: "Pokemon_Sprite",
    },
    types: [{ type: { name: "Pokemon_Type" } }],
    url: "https://Pokemon_url",
  };
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });
}) as Mock;

describe("PokeCell", () => {
  it("Renders the PokeCell component if url and function are defined", async () => {
    const user = userEvent.setup();
    render(<PokeCell url="https://pokeapi.co/api/v2/pokemon/1/" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(useDisplayedPokemonStore.getState().displayedPokemon).toBe(
      undefined
    );
    await user.click(button);
    expect(
      useDisplayedPokemonStore.getState().updateDisplayedPokemon
    ).toHaveBeenCalledTimes(1);
  });

  it("Renders nothing if url or function are not defined", () => {
    const { container } = render(<PokeCell />);
    expect(container).toBeEmptyDOMElement();
  });
});
