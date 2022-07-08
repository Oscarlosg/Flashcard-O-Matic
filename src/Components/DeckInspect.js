import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckItemInspect from "./DeckItemInspect";
import { deleteCard } from "../utils/api";
import { FaHome } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const DeckInspect = () => {
  const params = useParams();

  const [deck, setDeck] = useState({ cards: [] });
  // this allows the map function to run the function without crashing because map is proccesing the correct data type [empty array].
  // even if it is blank, it will process it without crashing, once the data arrives, it will run the function again with the correct data.
  const currentId = params.deckId;

  useEffect(() => {
    readDeck(currentId).then((data) => setDeck(data));
  }, [currentId]);

  const history = useHistory();

  function MapCards({ deck }) {
    return deck.cards.map((key, index) => {
      return (
        <div key={index} className="container border rounded mt-2 p-4">
          <div className=" d-flex justify-content-between m-3">
            <p>{key.front}</p>
            <p style={{ textAlign: "end" }}>{key.back}</p>
          </div>
          <div className="container d-flex flex-row-reverse">
            <button
              className="btn btn-danger pt-2 pb-2"
              onClick={() => {
                if (
                  window.confirm(
                    "Delete this card? \n \nYou will not be able to recover it."
                  ) === true
                ) {
                  deleteCard(key.id);
                  history.go(0);
                }
              }}
            >
              <FaTrashAlt />
            </button>
            <button
              className="btn btn-secondary mr-2 pt-2 pb-2"
              onClick={() =>
                history.push(`/decks/${key.deckId}/cards/${key.id}/edit`)
              }
            >
              <FiEdit /> Edit
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="d-flex alert alert-dark modal-dialog-centered">
        <Link className="mr-2 mb-1" to="/">
          <FaHome /> Home
        </Link>
        <span className="mr-2 mb-1">&#47;</span>
        <span className="mr-2 mb-1">{deck.name}</span>
      </div>
      <DeckItemInspect deck={deck} />
      <div className="container ml-1 pb-3">
        <h2>Cards</h2>
      </div>
      <MapCards deck={deck} />
    </>
  );
};

export default DeckInspect;
