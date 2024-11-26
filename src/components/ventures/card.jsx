import { PropTypes } from "prop-types";
import { MdOutlineLink } from "react-icons/md";
const Card = ({ img, title, category, description, link }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full h-[28rem] max-w-[32rem] bg-[#12172C] p-3  flex items-center justify-center rounded-3xl relative ">
        <img
          src={img}
          className="rounded-2xl block max-w-full w-full h-full aspect-square object-cover shadow-xl bg-slate-300"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4 items-start justify-center">
        <div className="flex items-center justify-between w-full flex-wrap gap-3">
          <h1 className="text-3xl leading-tight font-bold font-['BankGothic'] uppercase text-[#CBFB45]">
            {title}
          </h1>
          <button
            className="w-full lg:w-fit flex justify-end"
            onClick={() => window.open(link, "_blank")}
          >
            <MdOutlineLink size={25} />
          </button>
        </div>
        <span className='flex items-center uppercase font-medium text-lg font-["BankGothic"]'>
          category - {category}
        </span>
        <p>{description}</p>
      </div>
    </div>
  );
};
Card.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
};
export default Card;
