import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { FaTrashAlt } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
const DeckItem = ({ deck }) => {
  function deleteHandler() {
    deleteDeck(deck.id);
    history.go(0);
  }

  const history = useHistory();
  return (
    <div className="container border rounded mt-2 p-4">
      <div className="bd-highlight" style={{ display: "flex" }}>
        <div className=" flex-grow-1 bd-highlight">
          <h3>{deck.name}</h3>
        </div>
        <div className="bd-highlight">
          <p>{deck.cards.length} cards</p>
        </div>
      </div>
      <div>
        <p>{deck.description}</p>
        <div style={{ display: "flex" }}>
          <button
            className="btn btn-secondary mr-3 pt-2 pb-2"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            view
          </button>
          <button
            className="btn btn-primary pt-2 pb-2"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            <GiNotebook /> study
          </button>
          <button
            className="btn btn-danger pt-2 pb-2"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              if (
                window.confirm(
                  "Delete this deck? \n \nYou will not be able to recover it."
                ) === true
              ) {
                deleteHandler();
              }
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckItem;
