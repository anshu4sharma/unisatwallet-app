import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "@/context/UserContext";
type WalletConnectProps = {
  closeModal: () => void;
  isOpen: boolean;
};
export default function WalletConnect({
  closeModal,
  isOpen,
}: WalletConnectProps) {
  const { setAddress, setIsTestnet } = useContext(UserContext);
  const [walletType, setWalletType] = useState("");
  const isunisatTestnet = async () => {
    try {
      // @ts-ignore
      let res = await window.unisat.getNetwork();
      console.log(res);
      if (res === "testnet") {
        setIsTestnet(true);
        toast.success("Connected to Testnet");
      } else {
        toast.success("Connected to Mainnet");
        setIsTestnet(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const ConnectWallet = async () => {
    if (walletType == "unisat") {
      try {
        // @ts-ignore
        let accounts = await window.unisat.requestAccounts();
        setAddress(accounts[0]);
        isunisatTestnet();
        console.log("unisat");
        console.log(accounts[0]);
      } catch (e) {
        console.log("connect failed");
        toast.error("Connect Failed ! ");
      } finally {
        closeModal();
      }
    } else if (walletType == "okkx") {
      try {
        // @ts-ignore
        const result = await window.okxwallet.bitcoin.connect();
        console.log(result, "result");
        setAddress(result.address);
      } catch (e) {
        console.log("connect failed");
        toast.error("Connect Failed ! ");
      } finally {
        closeModal();
      }
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1E2834]  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Connect Wallet
                  </Dialog.Title>
                  <div className="my-2">
                    <div className="flex w-full justify-around gap-4 p-4">
                      <div
                        onClick={() => {
                          setWalletType("unisat");
                          ConnectWallet();
                        }}
                        className="flex text-white justify-center items-center flex-col"
                      >
                        <Image
                          alt="notfound"
                          src="/assets/unisat.png"
                          width={60}
                          height={50}
                          className="cursor-pointer"
                        />
                        <p className="text-sm">Unisat</p>
                      </div>
                      <div
                        onClick={() => {
                          setWalletType("okkx");
                          ConnectWallet();
                        }}
                        className="flex text-white justify-center items-center flex-col"
                      >
                        <Image
                          alt="notfound"
                          src="/assets/okkx.png"
                          width={60}
                          height={50}
                          className="cursor-pointer"
                        />
                        <p className="text-sm">OKX</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 text-center">
                      Please select a wallet from the following options to
                      interact with our dApp
                    </p>
                  </div>
                  <p className="text-sm text-gray-300 text-center">
                    By connecting your wallet, you agree to our Terms of
                    Service.
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
