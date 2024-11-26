import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StakeGVV from "../components/home/StakeGVV";
import GVVPurchase from "../components/home/GVVPurchase";
import PurchaseOrder from "../components/PurchaseOrder";
import RoundSelection from "../components/RoundSelection";

const Home = () => {
  const navigate = useNavigate();
  const goto = (path) => {
    navigate(path);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [showRoundSelection, setShowRoundSelection] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem("formSubmitted") === "true" || false;
    setIsFormSubmitted(submitted);
  }, []);

  const openDialog = () => {
    if (isFormSubmitted) {
      setShowRoundSelection(true);
    } else {
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setShowRoundSelection(false);
  };

  return (
    <>
      {!isDialogOpen && (
        <div className="max-w-8xl mx-4 md:mx-auto">
          <h2 className="font-['BankGothic'] text-4xl md:text-6xl font-bold mt-6 mb-6 md:mt-16">
            ABOUT $GVV
          </h2>
          <div className="flex flex-wrap gap-6 pb-14">
            <StakeGVV />
            <GVVPurchase openDialog={openDialog} goto={goto} />
          </div>
        </div>
      )}
      <PurchaseOrder
        isOpen={isDialogOpen}
        onClose={closeDialog}
        showSelection={true}
      />
      <RoundSelection show={showRoundSelection} onClose={closeDialog} />
    </>
  );
};

export default Home;
