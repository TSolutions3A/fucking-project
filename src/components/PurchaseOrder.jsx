import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import CountryDropdown from "./CountryDropdown";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import BuyGVVModal from "./BuyGVVModal";
import { apps } from "./rounds/data";
import RoundSelection from "./RoundSelection";
import axios from "axios";

const PurchaseOrder = ({
  isOpen,
  onClose,
  totalPrice,
  count,
  showSelection,
  closeDialog,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoundSelectionOpen, setIsRoundSelectionOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("email", selectedEmail);
    localStorage.setItem("country", selectedCountry);
    // Call the api to store email addresses
    axios
      .get("https://gvv-backend.onrender.com/api/user/store_email", {
        params: {
          email: selectedEmail,
          country: selectedCountry,
        },
      })
      .then((response) => {
        console.log("response:", response);
        localStorage.setItem("formSubmitted", "true");
        if (showSelection) {
          setIsRoundSelectionOpen(true);
        } else {
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRoundSelectionOpen(false);
    closeDialog();
  };
  const handleCloseSelection = () => {
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="relative  flex justify-center items-center my-10 lg:my-24">
      <div className="bg-slate-900 rounded-lg max-w-3xl mx-4 w-full">
        <div className="flex flex-col px-6 py-8 lg:px-6">
          <div className="flex gap-4 lg:gap-10 items-center">
            <h2 className="font-['BankGothic'] text-3xl lg:text-5xl break-words text-white">
              Purchase your order
            </h2>
            <IoClose
              onClick={onClose}
              className="text-2xl mb-6 cursor-pointer"
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MdOutlineEmail />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  required
                  className="block w-full pl-9 font-['BankGothic'] rounded-md bg-slate-950 border-0 py-3 text-white shadow-sm placeholder:text-white focus:ring-1 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2">
                <CountryDropdown
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md font-['BankGothic'] bg-dark_yellow px-3 py-3 text-base font-bold leading-6 text-black shadow-sm hover:bg-light_yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
                >
                  Proceed to Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-[-1] w-full h-full ">
        <img
          src="/assets/images/glow.svg"
          className="max-w-full h-auto object-cover"
          alt=""
        />
      </div>
      <BuyGVVModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        apps={apps}
        totalPrice={totalPrice}
        count={count}
      />
      <RoundSelection
        show={isRoundSelectionOpen}
        onClose={handleCloseSelection}
      />
    </div>
  );
};
PurchaseOrder.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default PurchaseOrder;
