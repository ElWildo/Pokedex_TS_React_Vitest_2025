import "../style/detailedview.css";
import Pokemon from "./Pokemon";

interface DetailViewProps {
  pokemon?: Pokemon;
}

export default function DetailView({ pokemon }: DetailViewProps) {
  const dataname =
    pokemon instanceof Pokemon && !!pokemon
      ? "ID: #" + pokemon.id + " " + pokemon.name
      : null;
  const datatype =
    pokemon instanceof Pokemon && !!pokemon ? "Type: " + pokemon.type : null;
  return (
    <section className="detail-view">
      <div className="sprite-wrapper" data-testid="sprite-wrapper">
        {pokemon instanceof Pokemon && !!pokemon ? (
          <img src={pokemon.sprite} className="sprite-image" alt="sprite" />
        ) : null}
      </div>
      <div className="data-wrapper">
        <h1 className="data-name">
          {pokemon instanceof Pokemon && !!pokemon ? dataname : null}
        </h1>
        <p className="data-char">
          {pokemon instanceof Pokemon && !!pokemon ? datatype : null}
        </p>
      </div>
    </section>
  );
}
