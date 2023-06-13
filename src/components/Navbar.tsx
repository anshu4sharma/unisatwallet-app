import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import WalletConnect from "./WalletConnect";
import { UserContext } from "@/context/UserContext";

const menu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/portfolio",
  },
  {
    label: "How to Join",
    href: "/portfolio",
  },
  {
    label: "Projects",
    href: "/portfolio",
  },

  {
    label: "Tokenomics",
    href: "/about",
  },
];
export default function Navbar() {
  const { address } = useContext(UserContext);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const ConnectWallet = async () => {
    // @ts-ignore
    if (typeof window.unisat !== "undefined") {
      openModal();
      console.log("UniSat Wallet is installed!");
    } else {
      console.log("UniSat Wallet is not installed!");
      toast.error("UniSat Wallet is not installed!");
    }
  };

  return (
    <>
      <nav className="md:px-8 md:py-0 p-6">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <Image
                  src="/assets/logo.png"
                  width={200}
                  height={200}
                  alt={"notfound"}
                  className="md:flex hidden"
                />
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {menu.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className="px-5 py-2 text-base font-medium text-[#798DA3]  hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {address ? (
                    <button
                      onClick={ConnectWallet}
                      className="leading-3 bg-white text-[#000000] font-bold h-12 btn"
                    >
                      {address.slice(0, 3) +
                        "..." +
                        address.slice(address.length - 4, address.length)}
                    </button>
                  ) : (
                    <button
                      onClick={ConnectWallet}
                      className="leading-3 bg-white text-[#000000] font-bold h-12 btn"
                    >
                      CONNECT
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Image
                    src="/assets/logo.png"
                    width={100}
                    height={100}
                    alt={"notfound"}
                    className="md:hidden"
                  />
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto  rounded-md md:hidden text-white focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {menu.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className="px-5 py-2 text-sm font-medium text-[#798DA3]  hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {address ? (
                    <button
                      onClick={ConnectWallet}
                      className="leading-3 bg-white text-[#000000] font-bold h-12 btn"
                    >
                      {address.slice(0, 3) +
                        "..." +
                        address.slice(address.length - 4, address.length)}
                    </button>
                  ) : (
                    <button
                      onClick={ConnectWallet}
                      className="leading-3 bg-white text-[#000000] font-bold h-12 btn"
                    >
                      CONNECT
                    </button>
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
      <WalletConnect closeModal={closeModal} isOpen={isOpen} />
    </>
  );
}
