import { useHistory, useParams } from "react-router-dom";

const CardForm = ({
  onSubmitHandler,
  onChangeHandler,
  state,
  boxOnePlaceholder = "Front side of card",
  boxTwoPlaceholder = "Back side of card",
}) => {
  const history = useHistory();
  const currentId = useParams().deckId;

  return (
    <form onSubmit={onSubmitHandler}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="form-label mb-3">
          Front
          <textarea
            required
            type="text"
            className="form-control mt-2"
            name="front"
            placeholder={boxOnePlaceholder}
            onChange={onChangeHandler}
            value={state.front}
          />
        </label>
        <label className="form-label mb-3">
          Back
          <textarea
            required
            type="text"
            className="form-control mt-2"
            name="back"
            placeholder={boxTwoPlaceholder}
            onChange={onChangeHandler}
            value={state.back}
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
  );
};

export default CardForm;
