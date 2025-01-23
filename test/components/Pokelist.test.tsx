import { render, screen, waitFor } from "@testing-library/react";
import PokeList from "../../src/components/Pokelist";
import { Mock, vi } from "vitest";

vi.mock("../../src/components/Pokecell", () => {
  console.log("called");
  return {
    default: vi.fn(() => <div data-testid="poke-el" />),
    namedExport: vi.fn(() => <div data-testid="poke-el" />),
  };
});

const mockResponse = {
  count: 2,
  next: "",
  previous: "",
  results: [
    { name: "pokemon_one", url: "_url_pokemon1" },
    { name: "pokemon_two", url: "_url_pokemon2" },
    { name: "pokemon_three", url: "_url_pokemon3" },
  ],
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  })
) as Mock;

describe("PokeList", () => {
  it("should render list of pokemon", async () => {
    render(<PokeList />);
    await waitFor(() => {
      expect(screen.getAllByTestId("poke-el"));
    });
    screen.getAllByTestId("poke-el").forEach((el) => {
      expect(el).toBeInTheDocument();
    });
    expect(screen.getAllByTestId("poke-el").length).toBe(
      mockResponse.results.length
    );
  });
});
