import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import { FaHome } from "react-icons/fa";

const NewDeck = () => {
  const history = useHistory();

  const initialFormState = { name: "", description: "" };

  const [newDeckForm, setNewDeckForm] = useState(initialFormState);

  function onChangeHandler(event) {
    const target = event.target;
    return setNewDeckForm({ ...newDeckForm, [target.name]: target.value });
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    createDeck(newDeckForm, AbortController.signal);
    setNewDeckForm(initialFormState);
    history.go(-1);
  }

  return (
    <>
      <div className=" d-flex alert alert-dark modal-dialog-centered">
        <Link className="mr-2 mb-1" to="/">
          <FaHome /> Home
        </Link>
        <span className="mr-2 mb-1">&#47;</span>
        <span className="mr-2 mb-1">Create Deck</span>
      </div>
      <div className="container">
        <h2>Create Deck</h2>
        <form onSubmit={onSubmitHandler}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="form-label mb-3">
              Name
              <input
                required
                className="form-control mt-2"
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={newDeckForm.name}
              />
            </label>
            <label className="form-label mb-4">
              Description
              <textarea
                required
                className="form-control mt-2"
                type="text"
                name="description"
                onChange={onChangeHandler}
                value={newDeckForm.description}
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => history.push("/")}
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

export default NewDeck;
