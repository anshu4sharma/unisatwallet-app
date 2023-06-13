import { UserContext } from "@/context/UserContext";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useContext } from "react";
import toast from "react-hot-toast";
const Hero = () => {
  const { setAddress } = useContext(UserContext);
  const { values, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      address: "",
      amount: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      sendTransaction();
    },
  });
  const sendTransaction = async () => {
    // @ts-ignore
    let accounts = await window.unisat.requestAccounts();
    console.log(accounts);
    setAddress(accounts[0]);
    if (accounts[0] !== undefined && accounts[0] !== null) {
      try {
        // @ts-ignore
        let txid = await window.unisat.sendBitcoin(
          values.address,
          values.amount
        );
        toast.success("Transaction Success");
        console.log(txid);
      } catch (e) {
        console.log(e);
        toast.error("Failed to send transaction");
      }
    } else {
      toast.error("Please Connect Wallet First");
    }
  };
  return (
    <div className="grid grid-cols-1 md:flex justify-center p-4  gap-4">
      <div className="flex flex-col rounded-lg shadow-orange-50 max-w-2xl items-start text-center bg-[#1E2834] p-6  md:p-8 gap-2">
        <h1 className="text-2xl font-black tracking-wider text-white">
          EON Token Sale Info
        </h1>
        <h1 className="text-base font-medium text-white">
          EON Token Sale Info
        </h1>
        <input
          type="text"
          placeholder="Timer"
          className="bg-[#181F29] outline-none border-none placeholder-shown:text-white text-white p-3 rounded-md w-full"
        />
        <p className="text-white text-base">
          Token Allocation = 10000000,000 EON
        </p>
        <p className="text-white   font-medium text-base">
          Price - 1 BTC = 10 EON
        </p>
        <p className="text-white   font-medium text-base">
          Minimum Buy = 10000000,000 EON
        </p>
        <p className="text-white  font-medium text-base">
          Maximum Buy = 10000000,000 EON
        </p>
        <p className="text-white text-base  font-medium">
          Sale Duration = 4 WEEKS
        </p>
        <p className="text-white font-medium text-base">Total Raised : 0/TBA</p>
        <div className="w-full bg-[#181F29] rounded-full h-4">
          <div
            className="bg-[#0B111D] h-4 rounded-full"
            style={{
              width: "50%",
            }}
          ></div>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-white text-base  font-medium">0 BTC</p>
          <p className="text-white text-base  font-medium">100,00,00 BTC</p>
        </div>
      </div>
      {/* transaction hash */}
      <div className="flex flex-col items-center gap-4 justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col rounded-lg shadow-orange-50 max-w-2xl items-start text-center bg-[#1E2834] p-6  md:p-8 gap-2"
        >
          <h1 className="text-2xl font-black tracking-wider mb-4 text-white">
            Buy EON Tokens
          </h1>
          <div className="flex w-full bg-[#181F29] rounded-md px-4">
            <input
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              name="address"
              placeholder="Enter Address Here ..."
              autoComplete="off"
              className="bg-[#181F29] outline-none border-none placeholder-shown:text-white text-white p-3 w-full"
            />
            <Image
              src={"/assets/bitcoin.svg"}
              width={85}
              height={80}
              alt="notfound"
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-center w-full">
            <Image
              src={"/assets/below.svg"}
              width={20}
              height={20}
              alt="notfound"
            />
          </div>
          <div className="flex w-full bg-[#181F29] rounded-md px-4">
            <input
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amount}
              name="amount"
              autoComplete="off"
              placeholder="Enter Amount Here ..."
              className="bg-[#181F29] outline-none border-none no-spinners placeholder-shown:text-white text-white p-3 w-full"
            />
            <Image
              src={"/assets/eon.svg"}
              width={70}
              height={70}
              alt="notfound"
              className="cursor-pointer"
            />
          </div>

          <button
            type="submit"
            placeholder="Timer"
            className="bg-[#181F29] buy p-2.5 w-full"
          >
            Buy
          </button>
        </form>
        <div className="flex w-full flex-col text-left rounded-lg shadow-orange-50 max-w-2xl items-start bg-[#1E2834] p-6  md:p-8 gap-2">
          <p className="text-white text-base text-left  font-medium break-all">
            Transaction Hash :
            0x8f1aab9b2200f541210c30df130bc286f64a735758fb47ed47b8d2b43f5578ee
          </p>
          <p className="text-white text-left text-base  font-medium">
            You will get 10.00 EON Tokens once the presale ends
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
