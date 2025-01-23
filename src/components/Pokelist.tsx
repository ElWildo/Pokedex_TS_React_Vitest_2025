import { useCallback, useEffect, useRef, useState } from "react";
import "../style/pokelist.css";
import PokeCell from "./Pokecell";
import global from "../global";

interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonDataForList[];
}

interface PokemonDataForList {
  name: string;
  url: string;
}

export default function PokeList() {
  const myRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PokemonResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [API, setAPI] = useState(global.API + "?limit=10");
  const [pokemonDisplayed, setPokemonDisplayed] = useState<
    PokemonDataForList[]
  >([]);

  const handleScroll = useCallback(() => {
    const el = (myRef.current as Element).getBoundingClientRect();
    const lastLi = (lastRef.current as Element).getBoundingClientRect();
    if (el.y + el.height >= lastLi.y + lastLi.height && !loading && data) {
      setLoading(true);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!loading && data && data?.count > 0) {
      setPokemonDisplayed((prevPokemon) => [...prevPokemon, ...data.results]);
      setAPI(data.next);
    }
  }, [data, loading]);

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        const fetchedData = await fetch(API);
        if (!fetchedData.ok) {
          throw new Error("Network response was not ok");
        }
        const result = (await fetchedData.json()) as PokemonResponse;
        setData(result);
        setLoading(false);
      };

      fetchData();
    }
  }, [API, loading]);

  useEffect(() => {
    const ref = myRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    if (ref) return () => ref.removeEventListener("scroll", handleScroll);
  }, [handleScroll, loading]);

  return (
    <div className="poke-list" ref={myRef}>
      {pokemonDisplayed.map((pokemon: PokemonDataForList, index: number) => (
        <PokeCell key={index} url={pokemon.url} />
      ))}
      <div className="endList" key="endList" ref={lastRef} />
    </div>
  );
}
