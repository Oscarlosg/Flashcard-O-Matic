import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api";
import { FaHome } from "react-icons/fa";

const EditDeck = () => {
  const history = useHistory();

  const currentId = useParams().deckId;

  const [editDeckForm, setEditDeckForm] = useState();
  const [pathName, SetPathName] = useState();

  useEffect(() => {
    readDeck(currentId).then((data) => {
      setEditDeckForm(data);
      SetPathName(data.name);
    });
  }, [currentId]);

  function onChangeHandler(event) {
    const target = event.target;
    return setEditDeckForm({ ...editDeckForm, [target.name]: target.value });
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    updateDeck(editDeckForm);
    history.push(`/decks/${currentId}`);
    history.go(0);
  }

  if (editDeckForm) {
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
          <span>Edit Deck</span>
        </div>
        <div className="container">
          <h2>Edit Deck</h2>
          <form onSubmit={onSubmitHandler}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="form-label mb-3">
                Name:
                <input
                  required
                  className="form-control mt-2"
                  type="text"
                  name="name"
                  onChange={onChangeHandler}
                  value={editDeckForm.name}
                />
              </label>
              <label className="form-label mb-4">
                Description:
                <textarea
                  required
                  className="form-control mt-2"
                  type="text"
                  name="description"
                  onChange={onChangeHandler}
                  value={editDeckForm.description}
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
  }

  return <p>Loading...</p>;
};

export default EditDeck;
