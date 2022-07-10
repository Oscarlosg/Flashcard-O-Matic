import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { readCard } from "../utils/api";
import { updateCard } from "../utils/api";
import { FaHome } from "react-icons/fa";
import CardForm from "./CardForm";

const EditCard = () => {
  const history = useHistory();

  const currentId = useParams().deckId;
  const currentcardId = useParams().cardId;

  const [currentCard, setCurrentCard] = useState({ name: "" });
  const [editCard, setEditCard] = useState({ front: "", back: "" });

  useEffect(() => {
    readDeck(currentId).then((data) => {
      setCurrentCard(data);
    });
    readCard(currentcardId).then((data) => {
      setEditCard(data);
    });
  }, [currentId, currentcardId]);

  function onChangeHandler(event) {
    const target = event.target;
    return setEditCard({ ...editCard, [target.name]: target.value });
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    updateCard(editCard);
    history.push(`/decks/${currentId}`);
    history.go(0);
  }

  return (
    <>
      <div className="d-flex alert alert-dark modal-dialog-centered">
        <Link to="/" className="mr-2">
          <FaHome /> Home
        </Link>
        <span className="mr-2">&#47;</span>
        <Link className="mr-2" to={`/decks/${currentId}`}>
          {currentCard.name}
        </Link>
        <span className="mr-2">&#47;</span>
        <span>Edit Card {currentcardId}</span>
      </div>
      <div className="container">
        <h2>Edit Card</h2>
        <CardForm
          onSubmitHandler={onSubmitHandler}
          onChangeHandler={onChangeHandler}
          state={editCard}
        />
      </div>
    </>
  );
};

export default EditCard;
