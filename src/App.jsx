import Navbar from "./components/navbar/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

import PrivateRound1 from "./pages/PrivateRound1";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Ventures from "./pages/Ventures";
import Overview from "./pages/Overview";
import Staking from "./pages/Staking";
import StakingToken from "./pages/StakingToken";
import NotFound from "./pages/NotFound";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get Project ID at https://cloud.walletconnect.com/app
const projectId = "aa45021d929dadda9ba1ba38548b9dc6";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const mainnetBNB = {
  chainId: 56,
  name: "Binance Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://rpc.ankr.com/bsc",
};

const mainnetMatic = {
  chainId: 137,
  name: "Polygon Mainnet",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com/",
  rpcUrl: "https://polygon-mainnet.infura.io",
};

// 3. Create a metadata object
const metadata = {
  name: "Private Round",
  description: "Private Round",
  url: "https://privateround.com",
  icons: ["https://privateround.com/favicon.ico"],
  provider: "WalletConnect",
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  defaultChainId: 1,
});

// 5. Create Web3Modal instance
createWeb3Modal({
  ethersConfig,
  projectId,
  chains: [mainnet, mainnetBNB, mainnetMatic],
  enableAnalytics: true,
});

function App() {
  return (
    <div className=" flex flex-col items-center w-full">
      <TopBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/round/:number" element={<PrivateRound1 />} />
        <Route path="/ventures" element={<Ventures />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/staking/token" element={<StakingToken />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
