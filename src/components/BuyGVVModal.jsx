import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import {
  useWeb3ModalAccount,
  useSwitchNetwork,
  useWeb3ModalProvider,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { Contract, BrowserProvider, ethers } from "ethers";
import axios from "axios";
// Contract Assets
import Web3 from "web3";
import CONTRACT_ADDRESS from "../utils/config";
import CONTRACT_ABI_PRESALE from "../utils/presaleVesting.json";
import CONTRACT_ABI_ETH_USDT from "../utils/eth_usdt.json";
import CONTRACT_ABI_BSC_USDT from "../utils/bsc_usdt.json";
import CONTRACT_ABI_POLY_USDT from "../utils/poly_usdt.json";
import CONTRACT_ABI_GVV from "../utils/gvv.json";
import Alert from "./Alert";

const BuyGVVModal = ({ isOpen, onClose, apps, totalPrice, count }) => {
  let roundNumber = 0;
  let tokenPrice = 0;
  const { number } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const { switchNetwork } = useSwitchNetwork();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();

  // Hide the alert after 5 seconds
  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        closeAlert();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [alert.visible]);

  useEffect(() => {
    if (number == 1) {
      roundNumber = 1;
      tokenPrice = 0.34;
    } else if (number == 2) {
      roundNumber = 0;
      tokenPrice = 0.23;
    } else if (number == 3) {
      roundNumber = 2;
      tokenPrice = 0.45;
    }
  });
  // to prevent whole website scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  const handleBuyGVV = async (app) => {
    setSelectedApp(app.name);
    if (isConnected) {
      if (app.name === "ETHEREUM") {
        setLoading(true);

        if (address.length > 0) {
          if (chainId !== 1) {
            await switchNetwork(1);
          }

          try {
            // Create Web3 instance
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();

            // Create contract instance
            const presale_contractInstance = new Contract(
              CONTRACT_ADDRESS.PresaleVestingAddr[1],
              CONTRACT_ABI_PRESALE,
              signer
            );

            try {
              const response = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
              );
              const data = await response.json();

              const ethAmount = Number(totalPrice) / Number(data.ethereum.usd);

              // Correct way to call the contract method using ethers.js
              const tx = await presale_contractInstance.buyTokensByNativeCoin(
                String(count),
                String(roundNumber),
                {
                  value: ethers.parseEther(String(ethAmount.toFixed(18))),
                }
              );

              // Wait for transaction to be mined
              const receipt = await tx.wait();
              setAlert({
                message: "Transaction successful!",
                type: "success",
                visible: true,
              });
              setLoading(false);
              handleBot(count, totalPrice);
            } catch (error) {
              setAlert({
                message: "An error occurred. Please try again.",
                type: "error",
                visible: true,
              });

              setLoading(false);
            }
          } catch (error) {
            setAlert({
              message: "An error occurred. Please try again.",
              type: "error",
              visible: true,
            });
            setLoading(false);
          }
        } else {
          setAlert({
            message: "Please connect to MetaMask first.",
            type: "error",
            visible: true,
          });
          setLoading(false);
        }
      } else if (app.name === "BNB") {
        setLoading(true);

        if (address.length > 0) {
          if (chainId !== 56) {
            await switchNetwork(56);
          }

          try {
            // Create Web3 instance
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();

            // Create contract instance
            const presale_contractInstance = new Contract(
              CONTRACT_ADDRESS.PresaleVestingAddr[2],
              CONTRACT_ABI_PRESALE,
              signer
            );

            try {
              const response = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
              );
              const data = await response.json();

              const ethAmount =
                Number(totalPrice) / Number(data.binancecoin.usd);

              // Correct way to call the contract method using ethers.js
              const tx = await presale_contractInstance.buyTokensByNativeCoin(
                String(count),
                String(roundNumber),
                {
                  value: ethers.parseEther(String(ethAmount.toFixed(18))),
                }
              );

              // Wait for transaction to be mined
              const receipt = await tx.wait();
              handleBot(count, totalPrice);
              setAlert({
                message: "Transaction successful!",
                type: "success",
                visible: true,
              });
              setLoading(false);
            } catch (error) {
              setAlert({
                message: "An error occurred. Please try again.",
                type: "error",
                visible: true,
              });

              setLoading(false);
            }
          } catch (error) {
            setAlert({
              message: "An error occurred. Please try again.",
              type: "error",
              visible: true,
            });
            setLoading(false);
          }
        } else {
          setAlert({
            message: "Please connect to MetaMask first.",
            type: "error",
            visible: true,
          });
          setLoading(false);
        }
      } else if (app.name === "MATIC") {
        setLoading(true);
        if (address.length > 0) {
          if (chainId !== 137) {
            await switchNetwork(137);
          }
          // Create Web3 instance
          try {
            // Create Web3 instance
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();

            // Create contract instance
            const presale_contractInstance = new Contract(
              CONTRACT_ADDRESS.PresaleVestingAddr[3],
              CONTRACT_ABI_PRESALE,
              signer
            );

            try {
              const response = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
              );
              const data = await response.json();

              const ethAmount =
                Number(totalPrice) / Number(data["matic-network"].usd);

              // Correct way to call the contract method using ethers.js
              const tx = await presale_contractInstance.buyTokensByNativeCoin(
                String(count),
                String(roundNumber),
                {
                  value: ethers.parseEther(String(ethAmount.toFixed(18))),
                }
              );

              // Wait for transaction to be mined
              const receipt = await tx.wait();
              setAlert({
                message: "Transaction successful!",
                type: "success",
                visible: true,
              });
              setLoading(false);
              handleBot(count, totalPrice);
            } catch (error) {
              setAlert({
                message: "An error occurred. Please try again.",
                type: "error",
                visible: true,
              });

              setLoading(false);
            }
          } catch (error) {
            setAlert({
              message: "An error occurred. Please try again.",
              type: "error",
              visible: true,
            });
            setLoading(false);
          }
        } else {
          setAlert({
            message: "Please connect to MetaMask first.",
            type: "error",
            visible: true,
          });
          setLoading(false);
        }
      } else if (app.name === "ERC20 USDT") {
        setLoading(true);

        if (address.length > 0) {
          try {
            if (chainId !== 1) {
              await switchNetwork(1);
            }

            // Create Web3 instance
            const web3 = new Web3(window.ethereum);

            // Create the USDT contract instance
            const usdtContractInstance = new web3.eth.Contract(
              CONTRACT_ABI_ETH_USDT,
              CONTRACT_ADDRESS.USDTAddr[1]
            );

            // Set the recipient address and amount
            const recipientAddress =
              "0xddb02e1f7f628de11eaeae7b3764cb4ef04199dc"; // Replace with recipient address
            const tempAmount = count * tokenPrice;
            const amount = web3.utils.toWei(tempAmount.toString(), "mwei"); // Amount to send in USDT

            // Get sender address
            const accounts = await web3.eth.getAccounts();
            const senderAddress = accounts[0];

            // Check sender balance
            const senderBalance = BigInt(
              await usdtContractInstance.methods.balanceOf(senderAddress).call()
            );

            // Convert amount to BigInt for comparison
            const amountBigInt = BigInt(amount);

            // Compare balances
            if (senderBalance < amountBigInt) {
              console.error("Insufficient USDT balance.");
              return;
            }

            // Create the transaction data
            const data = usdtContractInstance.methods
              .transfer(recipientAddress, amount)
              .encodeABI();

            // Create the transaction object
            const tx = {
              from: senderAddress, // Specify sender address
              to: CONTRACT_ADDRESS.USDTAddr[1],
              gas: 100000, // Reasonable gas limit for ERC-20 transfer
              data: data,
            };

            try {
              // Send the USDT transaction
              const txHash = await web3.eth.sendTransaction(tx);
              console.log("USDT Transaction Hash:", txHash.transactionHash);

              // Now send GVV tokens directly from the owner's account to the buyer's address
              const ownerPrivateKey = ""; // Replace with the GVV owner's private key

              // Initialize ethers.js with the provider and owner's private key
              const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers 6.x
              const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);

              // Create the GVV contract instance using ethers.js
              const gvvContractInstance = new ethers.Contract(
                CONTRACT_ADDRESS.GVVAddr[1],
                CONTRACT_ABI_GVV,
                ownerWallet
              );

              // Calculate the GVV amount to send
              const gvvAmount = ethers.parseUnits(String(count), 18); // Adjust decimal places as needed

              // Send GVV tokens from owner to buyer
              const transferGVVTransaction = await gvvContractInstance.transfer(
                address,
                gvvAmount
              );
              await transferGVVTransaction.wait();

              setAlert({
                message: "Transaction successful!",
                type: "success",
                visible: true,
              });
              handleBot(count, totalPrice);
            } catch (error) {
              console.error("Transaction Error:", error);
              setAlert({
                message: "USDT transfer or GVV transfer failed.",
                type: "error",
                visible: true,
              });
            }
          } catch (error) {
            console.error("Transaction error:", error);
            setAlert({
              message: "An error occurred. Please try again.",
              type: "error",
              visible: true,
            });
          } finally {
            setLoading(false);
          }
        } else {
          setAlert({
            message: "Please connect to MetaMask first.",
            type: "error",
            visible: true,
          });
          setLoading(false);
        }
      } else if (app.name === "BEP20 USDT") {
        setLoading(true);

        if (address.length > 0) {
          try {
            if (chainId !== 56) {
              await switchNetwork(56);
            }

            // Create Web3 instance using ethers
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Create contract instances
            const presaleContractInstance = new ethers.Contract(
              CONTRACT_ADDRESS.PresaleVestingAddr[2],
              CONTRACT_ABI_PRESALE,
              signer
            );

            const USDTContract = new ethers.Contract(
              CONTRACT_ADDRESS.USDTAddr[2],
              CONTRACT_ABI_BSC_USDT,
              signer
            );

            const amountToApprove = ethers.parseUnits(String(totalPrice), 18);
            // Check current allowance
            const currentAllowance = await USDTContract.allowance(
              address,
              CONTRACT_ADDRESS.PresaleVestingAddr[2]
            );
            if (currentAllowance < amountToApprove) {
              // Approve if current allowance is less than required
              try {
                const approveTransaction = await USDTContract.approve(
                  CONTRACT_ADDRESS.PresaleVestingAddr[2],
                  amountToApprove
                );
                await approveTransaction.wait();
                setAlert({
                  message: "Approval successful!",
                  type: "success",
                  visible: true,
                });
              } catch (error) {
                setAlert({
                  message: "Approval failed",
                  type: "error",
                  visible: true,
                });
                setLoading(false);
                return;
              }
            }

            // Now proceed with buying tokens
            try {
              const buyTokenProgress =
                await presaleContractInstance.buyTokensByUSDT(
                  String(count),
                  String(roundNumber)
                );
              await buyTokenProgress.wait();
              setAlert({
                message: "Transaction successful!",
                type: "success",
                visible: true,
              });
              handleBot(count, totalPrice);
            } catch (error) {
              setAlert({
                message: "Buy tokens failed",
                type: "error",
                visible: true,
              });
            }
          } catch (error) {
            setAlert({
              message: "An error occurred. Please try again.",
              type: "error",
              visible: true,
            });
          } finally {
            setLoading(false);
          }
        } else {
          setAlert({
            message: "Please connect to MetaMask first.",
            type: "error",
            visible: true,
          });
          setLoading(false);
        }
      } else if (app.name === "POLYGON USDT") {
        setLoading(true);

        if (address.length > 0) {
          try {
            if (chainId !== 137) {
              await switchNetwork(137);
            }

            // Create Web3 instance using ethers
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Create contract instances
            const presaleContractInstance = new ethers.Contract(
              CONTRACT_ADDRESS.PresaleVestingAddr[3],
              CONTRACT_ABI_PRESALE,
              signer
            );

            const USDTContract = new ethers.Contract(
              CONTRACT_ADDRESS.USDTAddr[3],
              CONTRACT_ABI_POLY_USDT,
              signer
            );
            const amountToApprove = ethers.parseUnits(String(totalPrice), 6);
            // Check current allowance
            const currentAllowance = await USDTContract.allowance(
              address,
              CONTRACT_ADDRESS.PresaleVestingAddr[3]
            );
            if (currentAllowance < amountToApprove) {
              // Approve if current allowance is less than required
              try {
                const approveTransaction = await USDTContract.approve(
                  CONTRACT_ADDRESS.PresaleVestingAddr[3],
                  amountToApprove
                );
                await approveTransaction.wait();
                setAlert({
                  message: "Approval successful!",
                  type: "success",
                  visible: true,
                });
              } catch (error) {
                setAlert({
                  message: "Approval failed.",
                  type: "error",
                  visible: true,
                });
                setLoading(false);
                return;
              }
            }

            // Now proceed with buying tokens
            try {
              console.log("here", presaleContractInstance);
              const buyTokenProgress =
                await presaleContractInstance.buyTokensByUSDT(
                  String(count),
                  String(roundNumber)
                );
              await buyTokenProgress.wait();
              setAlert({
                message: "Transaction successful!",
                type: "success",
                visible: true,
              });
              handleBot(count, totalPrice);
            } catch (error) {
              setAlert({
                message: "Buy tokens failed.",
                type: "error",
                visible: true,
              });
            }
          } catch (error) {
            setAlert({
              message: "An error occurred. Please try again.",
              type: "error",
              visible: true,
            });
          } finally {
            setLoading(false);
          }
        } else {
          setAlert({
            message: "Please connect to MetaMask first.",
            type: "error",
            visible: true,
          });
          setLoading(false);
        }
      }
    } else {
      open();
    }
  };

  const handleBot = async (amount, totalPrice) => {
    if (totalPrice > 100) {
      const botToken = "7553663256:AAFvtUQaGcTEic2cpzzhNo0Q2FKdvw5cnB0";
      const chatId = "-1002391695547";

      const email = localStorage.getItem("email");

      const tokenMessage = `${address} || ${email} user bought ${amount} $GVV.`;

      try {
        const response = await axios.get(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            params: {
              chat_id: chatId,
              text: tokenMessage,
              parse_mode: "HTML",
            },
          }
        );

        if (response.status === 200) {
          // console.log('Message sent successfully to Telegram!');
        } else {
          console.log(
            "Error sending message to Telegram: Status Code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error sending message to Telegram:", error);
      }
    } else if (totalPrice < 100) {
      const botToken = "7553663256:AAFvtUQaGcTEic2cpzzhNo0Q2FKdvw5cnB0";
      const chatId = "-1002364501953";
      console.log(chatId);
      const email = localStorage.getItem("email");

      const tokenMessage = `${address} || ${email} user bought ${amount} $GVV.`;

      try {
        const response = await axios.get(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            params: {
              chat_id: chatId,
              text: tokenMessage,
              parse_mode: "HTML",
            },
          }
        );

        if (response.status === 200) {
          // console.log('Message sent successfully to Telegram!');
        } else {
          console.log(
            "Error sending message to Telegram: Status Code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error sending message to Telegram:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-40 z-50">
      <div className="relative bg-slate-900 p-8 pt-16 rounded-xl shadow-xl w-11/12 max-w-2xl">
        <button
          className="absolute top-2 right-6 text-4xl  text-white"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {apps.map((app) => (
            <div
              key={app.name}
              className="flex flex-col items-center text-center p-4  bg-slate-800  rounded-lg cursor-pointer hover:bg-slate-700"
              onClick={() => handleBuyGVV(app)}
            >
              {loading && app.name === selectedApp ? (
                <BeatLoader
                  color={"#000000"}
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <img src={app.icon} alt={app.name} className="w-16 h-16 mb-2" />
              )}
              <span>{app.name}</span>
            </div>
          ))}
        </div>
        {alert.visible && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        )}
      </div>
    </div>
  );
};

export default BuyGVVModal;
