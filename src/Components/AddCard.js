import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";
import { FaHome } from "react-icons/fa";
import CardForm from "./CardForm";

const AddCard = () => {
  const currentId = useParams().deckId;

  const initialFormState = { front: "", back: "" };

  const [newCardForm, setNewCardForm] = useState(initialFormState);
  const [pathName, SetPathName] = useState();

  useEffect(() => {
    readDeck(currentId).then((data) => SetPathName(data.name));
  }, [currentId]);

  function onChangeHandler(event) {
    const target = event.target;
    return setNewCardForm({ ...newCardForm, [target.name]: target.value });
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    createCard(currentId, newCardForm);
    setNewCardForm(initialFormState);
  }

  return (
    <>
      <div className="d-flex alert alert-dark modal-dialog-centered">
        <Link to="/" className="mr-2">
          <FaHome /> Home
        </Link>
        <span className="mr-2">&#47;</span>
        <Link className="mr-2" to={`/decks/${currentId}`}>
          {pathName}
        </Link>
        <span className="mr-2">&#47;</span>
        <span>Add Card</span>
      </div>
      <div className="container">
        <h2>{pathName}: Add Card</h2>
        <CardForm
          onSubmitHandler={onSubmitHandler}
          onChangeHandler={onChangeHandler}
          state={newCardForm}
        />
      </div>
    </>
  );
};

export default AddCard;
