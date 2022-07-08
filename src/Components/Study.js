import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { FaHome } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";

const Study = () => {
  const params = useParams();

  const [deck, setDeck] = useState();
  const [isFrontCard, setIsFrontCard] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const currentId = params.deckId;
    readDeck(currentId).then((currId) => setDeck(currId));
  }, [params.deckId]);

  function EnnoughCards() {
    if (deck.cards.length >= 3) {
      return (
        <div className="container border rounded mt-2 p-4">
          <h5 className="pb-2" style={{ fontWeight: "bold" }}>
            card {currentCard + 1} of {deck.cards.length}
          </h5>
          <p className="pb-1">
            {isFrontCard === true
              ? deck.cards[currentCard].front
              : deck.cards[currentCard].back}
          </p>
          <button
            className="btn btn-secondary mr-2 pt-2 pb-2"
            onClick={() => setIsFrontCard(!isFrontCard)}
          >
            Flip
          </button>
          <NextButton />
        </div>
      );
    } else
      return (
        <div className="container ml-1">
          <h2>Not enough Cards.</h2>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in this deck
          </p>
          <button
            className="btn btn-primary mr-3 pt-2 pb-2"
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
          >
            <BiAddToQueue /> Add Cards
          </button>
        </div>
      );
  }

  function NextButton() {
    if (isFrontCard === false) {
      return (
        <button
          className="btn btn-primary mr-2 pt-2 pb-2"
          onClick={() => {
            if (currentCard < deck.cards.length - 1) {
              setCurrentCard(currentCard + 1);
              setIsFrontCard(true);
            } else {
              if (
                window.confirm(
                  "Restart cards? \n \nClick 'Cancel' to return to the home page"
                ) === true
              ) {
                setCurrentCard(0);
              } else {
                history.push("/");
              }
            }
          }}
        >
          Next
        </button>
      );
    } else {
      return null;
    }
  }

  if (deck) {
    return (
      <>
        <div className="d-flex alert alert-dark modal-dialog-centered">
          <Link to="/" className="mr-2">
            {" "}
            <FaHome /> Home
          </Link>
          <span className="mr-2">&#47;</span>
          <Link className="mr-2" to={`/decks/${deck.id}`}>
            {deck.name}
          </Link>
          <span className="mr-2">&#47;</span>
          <span className="mr-2">Study</span>
        </div>
        <div className="container ml-1 mb-3 pt-2">
          <h2>Study: {deck.name} </h2>
        </div>
        <EnnoughCards />
      </>
    );
  }

  return <h2>Loading...</h2>;
};

export default Study;
