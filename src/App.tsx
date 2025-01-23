import "./style/app.css";
import PokeList from "./components/Pokelist";
import DetailedView from "./components/DetailedView";
// import Pokemon from "./components/Pokemon";
import useDisplayedPokemonStore from "./hooks/useDisplayedPokemonStore";

export default function App() {
  const { displayedPokemon } = useDisplayedPokemonStore();

  return (
    <div className="App">
      <PokeList />
      <DetailedView pokemon={displayedPokemon} />
    </div>
  );
}
