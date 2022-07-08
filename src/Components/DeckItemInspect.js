import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { GiNotebook } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

const DeckItemInspect = ({ deck }) => {
  const history = useHistory();

  function deleteHandler() {
    deleteDeck(deck.id);
    history.go(0);
  }

  const confirmHandler = () => history.push("/") + deleteHandler();

  return (
    <div className="container rounded mt-2 p-4">
      <div>
        <div className=" flex-row-1 bd-highlight">
          <h3>{deck.name}</h3>
        </div>
        <p>{deck.description}</p>
        <div className="d-flex bd-highlight mb-3">
          <button
            className="btn btn-secondary mr-3"
            onClick={() => history.push(`/decks/${deck.id}/edit`)}
          >
            <FiEdit /> Edit
          </button>
          <button
            className="btn btn-primary mr-3"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            <GiNotebook /> study
          </button>
          <button
            className="btn btn-primary mr-3 pt-2 pb-2"
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
          >
            <BiAddToQueue /> Add Cards
          </button>
          <button
            className="btn btn-danger"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              if (
                window.confirm(
                  "Delete this deck? \n \nYou will not be able to recover it."
                ) === true
              ) {
                confirmHandler();
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

export default DeckItemInspect;
