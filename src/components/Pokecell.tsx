import React, { useEffect, useState } from "react";
import "../style/pokecell.css";
import miss from "../assets/miss.png";
import useDisplayedPokemonStore from "../hooks/useDisplayedPokemonStore";
import Pokemon from "./Pokemon";

interface PokeCellProps {
  url?: string;
}

export default function PokeCell({ url }: PokeCellProps) {
  const { updateDisplayedPokemon } = useDisplayedPokemonStore();
  const [style, setStyle] = useState<React.CSSProperties | undefined>(
    undefined
  );

  function handleOnClick(url: string): void {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const pokemon = new Pokemon(data);
        updateDisplayedPokemon(pokemon);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (url) {
      const getData = async () => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setStyle({
              backgroundImage: data.sprites.front_default
                ? "url(" + data.sprites.front_default + ")"
                : "url(" + miss + ")",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      getData();
    }
  }, [url]);

  return (
    url &&
    handleOnClick && (
      <button
        className="poke-cell"
        style={style}
        onClick={() => handleOnClick(url)}
      />
    )
  );
}
