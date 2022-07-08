import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckItem from "./DeckItem";

const ViewDecks = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then((fetchDecks) => setDecks(fetchDecks));
  }, []);

  const history = useHistory();

  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => history.push("/decks/new")}
      >
        Create Deck
      </button>
      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default ViewDecks;
