import { useNavigate, useParams } from "react-router-dom";
import Round from "./Round";
import { useEffect, useState } from "react";
import { rounds } from "../components/rounds/data";

const PrivateRound2 = () => {
  const { number } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (number > 0 && number < rounds.length + 1) setData(rounds[number - 1]);
    else {
      setData("Not");
    }
  }, [number]);

  if (data == "Not") {
    navigate("/not-found");
  }

  return (
    data && (
      <Round
        title={data?.title}
        paragraph={data?.paragraph}
        gvvDiscount={data?.gvvDiscount}
        cards={data?.cards}
      />
    )
  );
};

export default PrivateRound2;
