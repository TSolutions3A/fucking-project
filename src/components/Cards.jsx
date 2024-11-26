import Card from "./Card";
import { PropTypes } from "prop-types";

const Cards = ({ cards }) => {
  const duplicatedCards = [...cards, ...cards];

  return (
    <div className="cardsScrollWrapper">
      <div className="cardsScroll">
        {duplicatedCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default Cards;
