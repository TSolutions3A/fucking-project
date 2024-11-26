import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "/assets/images/logo.png";
import { SlArrowDown } from "react-icons/sl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { navData } from "./navData";
import { useWeb3ModalAccount, useDisconnect } from "@web3modal/ethers/react";
import Alert from "../Alert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [navigation, setNavigation] = useState(navData);
  const navigate = useNavigate();
  const [account, setAccount] = useState("Connect");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

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

  const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  const goto = (path) => {
    if (path != "#") {
      navigate(path);
    }
  };

  const handleChangeCurrent = (index) => {
    const temp = [...navigation];
    temp.forEach((item, i) => {
      if (i === index) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
    setNavigation(temp);
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        localStorage.setItem("wallet", accounts[0]);
      } catch (error) {
        setAlert({
          message: "Error connecting to MetaMask.",
          type: "error",
          visible: true,
        });
      }
    } else {
      setAlert({
        message: "MetaMask not detected. Please install MetaMask.",
        type: "error",
        visible: true,
      });
    }
  };

  const handleDisConnectWallet = () => {
    setAccount("Connect");
    setAlert({
      message: "Disconnected from wallet.",
      type: "success",
      visible: true,
    });
    console.log("Disconnected from wallet");
  };

  return (
    <div className="w-full">
      <Disclosure as="nav" className="bg-white bg-opacity-5">
        <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center px-2 text-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-8 w-8 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-8 w-8 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div
              onClick={() => goto("/")}
              className="hidden lg:flex flex-shrink-0 items-center cursor-pointer"
            >
              <img alt="GVV" src={logo} className="h-8 w-auto" />
              <span className="font-['BankGothic'] text-white text-3xl font-bold">
                GVV
              </span>
            </div>
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Menu as="div" className="relative ml-3" key={item.name}>
                      <MenuButton
                        onClick={() => {
                          handleChangeCurrent(navigation.indexOf(item));
                          goto(item.href);
                        }}
                        className={classNames(
                          item.current
                            ? "text-dark_lime"
                            : "text-white hover:text-dark_lime",
                          "rounded-md px-3 py-2 text-base font-['BankGothic'] flex gap-2"
                        )}
                      >
                        {item.name}
                        {item.dropdown.length > 0 && (
                          <SlArrowDown className="text-sm mt-1" />
                        )}
                      </MenuButton>
                      {item.dropdown.length > 0 && (
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-900 border border-slate-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                          {item.dropdown.map((dropdownItem) => (
                            <MenuItem key={dropdownItem.name}>
                              {({ current }) => (
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleChangeCurrent(
                                      navigation.indexOf(item)
                                    );
                                    goto(dropdownItem.href);
                                  }}
                                  className={`block w-full px-4 py-2 text-sm hover:bg-slate-800 font-['BankGothic'] ${
                                    current ? "bg-slate-800" : "text-white"
                                  }`}
                                >
                                  {dropdownItem.name}
                                </button>
                              )}
                            </MenuItem>
                          ))}
                        </MenuItems>
                      )}
                    </Menu>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isConnected ? (
                <Button
                  className="text-white text-base rounded-2xl bg-dark_blue py-3 px-9 hover:bg-opacity-80"
                  onClick={() => disconnect()}
                >
                  {address.substring(0, 6)}...{address.substring(37, 42)}
                </Button>
              ) : (
                <w3m-button />
              )}
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

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure key={item.name} as="div" className="relative">
                <DisclosureButton
                  as="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.name ? null : item.name
                    )
                  }
                  className={classNames(
                    item.current
                      ? "text-dark_lime"
                      : "text-white hover:text-dark_lime",
                    "flex items-center justify-between w-full rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                  {item.dropdown.length > 0 && (
                    <SlArrowDown className="text-sm mt-1 ml-2" />
                  )}
                </DisclosureButton>
                {item.dropdown.length > 0 && openDropdown === item.name && (
                  <DisclosurePanel className="mt-2 space-y-1">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-slate-800 font-['BankGothic']"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </DisclosurePanel>
                )}
              </Disclosure>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
