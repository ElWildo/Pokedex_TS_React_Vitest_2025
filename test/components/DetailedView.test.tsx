import { render, screen } from "@testing-library/react";
import DetailView from "../../src/components/DetailedView";
import Pokemon from "../../src/components/Pokemon";

describe("DetailView", () => {
  it("Renders the DetailView components if pokemon is defined", () => {
    const dummyPokemon: Pokemon = new Pokemon({
      id: "0",
      name: "Pokemon_Name",
      sprites: {
        front_default: "Pokemon_Sprite",
      },
      types: [{ type: { name: "Pokemon_Type" } }],
      url: "https://Pokemon_url",
    });
    render(<DetailView pokemon={dummyPokemon} />);
    const image = screen.getByRole("img");
    const name = screen.getByRole("heading", { level: 1 });
    const type = screen.getByRole("paragraph");

    expect(image).toBeInTheDocument();
    expect(name).toHaveTextContent(/^ID: #[0-9] [a-zA-Z_]+$/);
    expect(type).toHaveTextContent(/^Type: [a-zA-Z_]+$/);
  });

  it("Renders DetailView without data if pokemon are not defined", () => {
    render(<DetailView />);
    const spriteWrapper = screen.getByTestId("sprite-wrapper");
    const name = screen.getByRole("heading", { level: 1 });
    const type = screen.getByRole("paragraph");

    expect(spriteWrapper).toBeEmptyDOMElement();
    expect(name).not.toHaveTextContent(/^ID: #[0-9] [a-zA-Z_]+$/);
    expect(type).not.toHaveTextContent(/^Type: [a-zA-Z_]+$/);
  });
});
