import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";
import { FaHome } from "react-icons/fa";

const AddCard = () => {
  const history = useHistory();

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
        <form onSubmit={onSubmitHandler}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="form-label mb-3">
              Front
              <textarea
                required
                type="text"
                className="form-control mt-2"
                name="front"
                placeholder="Front side of card"
                onChange={onChangeHandler}
                value={newCardForm.front}
              />
            </label>
            <label className="form-label mb-3">
              Back
              <textarea
                required
                type="text"
                className="form-control mt-2"
                name="back"
                placeholder="Back side of card"
                onChange={onChangeHandler}
                value={newCardForm.back}
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => history.push(`/decks/${currentId}`)}
            >
              cancel
            </button>
            <button className="btn btn-primary" type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCard;
