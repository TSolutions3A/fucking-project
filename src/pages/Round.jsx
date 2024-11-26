import { useState, useEffect } from "react";
import { FaInfoCircle, FaCopy } from "react-icons/fa";
import PropTypes from "prop-types";
import Count from "../components/Count";
import Cards from "../components/Cards";
import Video from "../components/Video";
import BuyGVVModal from "../components/BuyGVVModal";
import PurchaseOrder from "../components/PurchaseOrder";
import { apps } from "../components/rounds/data";
import Countdown from "../components/Countdown";

const tokenAddresses = {
  ETH: "0x27bB163e20AFD6285d862bd98e515baDD9ECe957",
  BSC: "0xb6fcdd3560cbb04ae998ca7eb50ee864bbfd8d4c",
  POL: "0xb6fCDd3560CBB04ae998ca7Eb50ee864BbFd8d4c",
};

const Round = ({
  title,
  paragraph,
  gvvDiscount,
  cards,
  videoLink,
  basePrice,
  number,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem("formSubmitted") === "true" || false;
    setIsFormSubmitted(submitted);
  }, []);

  const totalPrice = basePrice * count;

  const handleBuyClick = () => {
    if (isFormSubmitted) {
      setModalOpen(true);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleCloseModal = () => {
    window.location.reload();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCopyClick = (address) => {
    navigator.clipboard.writeText(address);
    alert("Copied to clipboard!");
  };

  return (
    <>
      {!isDialogOpen && (
        <>
          <div className="flex items-center justify-center py-24 px-3">
            <div className="lg:container gap-8 flex flex-col lg:flex-row items-center">
              <div>
                <div className="bg-[#12172C] p-3 w-fit md:w-[90%] flex items-center justify-center rounded-3xl">
                  <img
                    src="/assets/images/coin.svg"
                    className="rounded-2xl block max-w-full h-auto object-cover shadow-xl"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 flex-1 max-w-2xl">
                <h1 className="text-5xl max-w-xl leading-tight font-bold font-['BankGothic']">
                  {title}
                </h1>
                <p className="w-auto whitespace-pre-line">{paragraph}</p>
                <div className="w-full flex p-4 items-center justify-center rounded-full bg-[#12172C] backdrop-blur-lg">
                  <p className="flex items-center gap-3 text-base lg:text-2xl">
                    $GVV {count} <span>-</span>
                    <span className='text-[#F9E727] font-["BankGothic"]'>
                      ${totalPrice.toFixed(2)}{" "}
                      {gvvDiscount > 1 && `( ${gvvDiscount}% Discount )`}
                    </span>
                  </p>
                </div>
                <Count count={count} setCount={setCount} />
                {number == 2 ? (
                  <Countdown targetDate={new Date("2024-10-30")} />
                ) : number == 3 ? (
                  <Countdown targetDate={new Date("2024-11-30")} />
                ) : (
                  <button
                    onClick={handleBuyClick}
                    className="w-full lg:w-fit bg-[#F9E727] text-black uppercase px-6 py-3 rounded-lg text-xl font-bold font-['BankGothic']"
                  >
                    Buy $GVV
                  </button>
                )}
                <BuyGVVModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  apps={apps}
                  totalPrice={totalPrice.toFixed(2)}
                  count={count}
                />
              </div>
            </div>
          </div>
          <div className="max-w-8xl">
            <Cards cards={cards} />
          </div>
          <div className="flex flex-col items-center justify-center py-12 px-3 container gap-4">
            {Object.entries(tokenAddresses).map(([network, address]) => (
              <div key={network} className="flex items-center gap-2">
                <span className="font-bold">{network}:</span>
                <span>{address}</span>
                <button
                  className="bg-[#F9E727] text-black p-2 rounded-full"
                  onClick={() => handleCopyClick(address)}
                >
                  <FaCopy />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center py-12 px-3">
            <div className="w-full flex p-4 gap-5 items-center justify-center rounded-full px-8 bg-[#12172C] backdrop-blur-lg">
              <div className="text-[#F9E727]">
                <FaInfoCircle size={20} />
              </div>
              <p className="flex items-center gap-3 text-base lg:text-2xl font-['BankGothic']">
                Video Guide to Buy GVV
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center py-12 px-3 container">
            <Video videoLink={videoLink} />
          </div>
        </>
      )}
      <PurchaseOrder
        isOpen={isDialogOpen}
        onClose={handleCloseModal}
        closeDialog={handleCloseDialog}
        showSelection={false}
        totalPrice={totalPrice}
        count={count}
      />
    </>
  );
};

Round.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  gvvDiscount: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  videoLink: PropTypes.string.isRequired,
};

export default Round;
