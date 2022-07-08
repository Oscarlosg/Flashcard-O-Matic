import { Route, Switch } from "react-router-dom";
import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "../Components/Study";
import ViewDecks from "../Components/ViewDecks";
import NewDeck from "../Components/NewDeck";
import DeckInspect from "../Components/DeckInspect";
import EdicDeck from "../Components/EditDeck";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";
import "./Index.css";

function Layout() {
  return (
    <>
      <Header />
      <div>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <ViewDecks />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EdicDeck />
            </Route>
            <Route path="/decks/:deckId/study">
              <Study />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route path="/decks/new">
              <NewDeck />
            </Route>
            <Route path="/decks/:deckId">
              <DeckInspect />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Layout;
