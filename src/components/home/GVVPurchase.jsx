import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import ProgressBar from "../ProgressBar";
import { PropTypes } from "prop-types";
import HomeChart from "./HomeChart";
import CONTRACT_ADDRESS from "../../utils/config";
import CONTRACT_ABI_PRESALE from "../../utils/presaleVesting.json";

const GVVPurchase = ({ openDialog, goto }) => {
  const [PurchasedGVV, setPurchasedGVV] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fetchPurchasedGVV = async () => {
      try {
        // List of fallback providers for each network
        const ETH_providers = [
          "https://mainnet.infura.io/v3/e89d286f38f848c885d1fb6fdda37b13",
          "https://main-rpc.linkpool.io",
          "https://cloudflare-eth.com",
        ];

        const BSC_providers = [
          "https://bsc-rpc.publicnode.com",
          "https://bsc-dataseed.binance.org/",
          "https://bsc-dataseed1.defibit.io/",
        ];

        const Matic_providers = [
          "https://polygon-rpc.com/",
          "https://rpc-mainnet.maticvigil.com/",
          "https://matic-mainnet.chainstacklabs.com/",
        ];

        // Function to create a provider and handle retries
        const createProvider = async (providers) => {
          for (let i = 0; i < providers.length; i++) {
            try {
              const provider = new ethers.JsonRpcProvider(providers[i]);
              await provider.getBlockNumber(); // Simple check to ensure provider is reachable
              return provider;
            } catch (error) {
              console.warn(`Provider ${providers[i]} failed, trying next...`);
              if (i === providers.length - 1) {
                throw new Error("All providers failed");
              }
            }
          }
        };

        const ETH_provider = await createProvider(ETH_providers);
        const BSC_provider = await createProvider(BSC_providers);
        const Matic_provider = await createProvider(Matic_providers);

        const ETHcontract = new ethers.Contract(
          CONTRACT_ADDRESS.PresaleVestingAddr[1],
          CONTRACT_ABI_PRESALE,
          ETH_provider
        );

        const ETH_purchasedGVVRound0 = await ETHcontract.tokenSoldAmount(0);
        const ETH_purchasedGVVRound1 = await ETHcontract.tokenSoldAmount(1);
        const ETH_purchasedGVVRound2 = await ETHcontract.tokenSoldAmount(2);

        const ETH_totalAmount =
          Number(ETH_purchasedGVVRound0.toString()) +
          Number(ETH_purchasedGVVRound1.toString()) +
          Number(ETH_purchasedGVVRound2.toString());

        console.log("ETH_totalAmount", ETH_totalAmount);

        const BSCcontract = new ethers.Contract(
          CONTRACT_ADDRESS.PresaleVestingAddr[2],
          CONTRACT_ABI_PRESALE,
          BSC_provider
        );

        const BSC_purchasedGVVRound0 = await BSCcontract.tokenSoldAmount(0);
        const BSC_purchasedGVVRound1 = await BSCcontract.tokenSoldAmount(1);
        const BSC_purchasedGVVRound2 = await BSCcontract.tokenSoldAmount(2);

        const BSC_totalAmount =
          Number(BSC_purchasedGVVRound0.toString()) +
          Number(BSC_purchasedGVVRound1.toString()) +
          Number(BSC_purchasedGVVRound2.toString());

        console.log("BSC_totalAmount", BSC_totalAmount);

        const MATICcontract = new ethers.Contract(
          CONTRACT_ADDRESS.PresaleVestingAddr[3],
          CONTRACT_ABI_PRESALE,
          Matic_provider
        );

        const MATIC_purchasedGVVRound0 = await MATICcontract.tokenSoldAmount(0);
        const MATIC_purchasedGVVRound1 = await MATICcontract.tokenSoldAmount(1);
        const MATIC_purchasedGVVRound2 = await MATICcontract.tokenSoldAmount(2);

        const MATIC_totalAmount =
          Number(MATIC_purchasedGVVRound0.toString()) +
          Number(MATIC_purchasedGVVRound1.toString()) +
          Number(MATIC_purchasedGVVRound2.toString());

        console.log("MATIC_totalAmount", MATIC_totalAmount);

        const totalAmount =
          ETH_totalAmount + BSC_totalAmount + MATIC_totalAmount - 1000000;
        setPurchasedGVV(totalAmount);

        localStorage.setItem("totalBuys", Number(totalAmount));

        setProgress((Number(totalAmount) / 200000000) * 100);
      } catch (error) {
        console.log(error);
      }
    };

    // Replace with your API keys
    const ETHERSCAN_API_KEY = "6J1RU15WQSV6CPEIASNAFS3Q3CVQQSY8I1";
    const BSCSCAN_API_KEY = "9TY8DZHQB3X5JZG653P3FDT1T4XHJR5B8J";
    const POLYGONSCAN_API_KEY = "IDNFJ15AH3H59UJG5A8XA7FMBFPYN2FIDV";

    // Replace with the addresses you want to fetch transactions for
    const addresses = {
      etherscan: "0x4f26209f1cc61ba64ce0562e60022a791965220d",
      bscscan: "0x5d40adaee9b0f22191e1039eead8a1d8037484c9",
      polygonscan: "0x5d40AdAEE9b0F22191E1039EeaD8A1D8037484c9",
    };

    // API URLs
    const apiUrls = {
      etherscan: `https://api.etherscan.io/api?module=account&action=txlist&address=${addresses.etherscan}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`,
      bscscan: `https://api.bscscan.com/api?module=account&action=txlist&address=${addresses.bscscan}&startblock=0&endblock=99999999&sort=asc&apikey=${BSCSCAN_API_KEY}`,
      polygonscan: `https://api.polygonscan.com/api?module=account&action=txlist&address=${addresses.polygonscan}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGONSCAN_API_KEY}`,
    };

    // Function to fetch transaction data from each explorer
    async function fetchTransactions(url) {
      try {
        const response = await axios.get(url);
        if (response.data.status === "1") {
          return response.data.result;
        } else {
          console.error("Error fetching transactions:", response.data.message);
          return [];
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    }

    // Function to calculate unique "FROM" addresses
    function calculateUniqueFromAddresses(transactions) {
      const fromAddresses = transactions.map((tx) => tx.from.toLowerCase());
      const uniqueFromAddresses = new Set(fromAddresses);
      return uniqueFromAddresses;
    }

    // Main function to fetch transactions from all explorers and calculate unique "FROM" addresses
    async function fetchUniqueBuyers() {
      const etherscanTransactions = await fetchTransactions(apiUrls.etherscan);
      const bscscanTransactions = await fetchTransactions(apiUrls.bscscan);
      const polygonscanTransactions = await fetchTransactions(
        apiUrls.polygonscan
      );

      const allTransactions = [
        ...etherscanTransactions,
        ...bscscanTransactions,
        ...polygonscanTransactions,
      ];

      const uniqueFromAddresses = calculateUniqueFromAddresses(allTransactions);

      console.log(
        `Number of unique "FROM" addresses across all explorers: ${uniqueFromAddresses.size}`
      );
      const uniqueBuyers = Number(uniqueFromAddresses.size) - 1;

      localStorage.setItem("uniqueBuys", Number(uniqueBuyers));
    }

    fetchPurchasedGVV();
    fetchUniqueBuyers();
  }, []);

  return (
    <div className="bg-slate-900 w-full md:w-[calc(50%-0.75rem)] p-4 md:p-8 rounded-xl flex flex-col justify-between">
      <HomeChart fileUrl="https://docs.google.com/spreadsheets/d/1_S2fyXRX3HJ8vPPYjCiThVLOEEh77gMYiCRHuApnujo/export?format=xlsx" />

      <div className="border-t-2 border-white border-opacity-20">
        <h2 className="font-['BankGothic'] font-bold text-2xl md:text-4xl my-4 md:my-8">
          <span className="animate-pulse">$GVV {PurchasedGVV} </span> PURCHASED
        </h2>
        <p className="font-['Inter'] mb-4 text-xl md:text-3xl animate-pulse">
          $GVV {PurchasedGVV}
        </p>
        <ProgressBar value={progress} max={100} />
        <p className="font-['BankGothic'] mt-6 mb-8 text-lg md:text-2xl">
          $GVV PURCHASED IN <span className="animate-pulse">1069 DAYS</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <a
            href="/assets/files/GVV Whitepaper - Draft.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-[calc(50%-0.75rem)]"
          >
            <button className="rounded-lg bg-blue-950 opacity-70 w-full p-3 hover:bg-slate-800">
              READ WHITE PAPER
            </button>
          </a>
          <button
            onClick={openDialog}
            className="rounded-lg bg-dark_blue w-full md:w-[calc(50%-0.75rem)] p-3 hover:bg-opacity-80"
          >
            Buy $GVV
          </button>
        </div>
      </div>
    </div>
  );
};

GVVPurchase.propTypes = {
  progress: PropTypes.number,
  openDialog: PropTypes.func,
  goto: PropTypes.func,
};
export default GVVPurchase;
