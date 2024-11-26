import { PropTypes } from "prop-types";

const Card = ({ title, price }) => {
  return (
    <div className="flex flex-col p-8 py-12 rounded-3xl card shadow-lg gap-3 items-center shrink-0  max-w-[22rem] snap-center">
      <h1 className="text-2xl uppercase">{title}</h1>
      {title == "Total Buys" ? (
        <span>{localStorage.getItem("totalBuys")}</span>
      ) : title == "Unique Buyers" ? (
        <span>{localStorage.getItem("uniqueBuys")}</span>
      ) : (
        <span>{price}</span>
      )}
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
};
export default Card;
