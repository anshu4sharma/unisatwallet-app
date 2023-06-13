import { UserContext } from "@/context/UserContext";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
const Hero = () => {
  const { setAddress, balance } = useContext(UserContext);
  const [transactionHash, setTransactionHash] = React.useState("");
  const { values, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      btc: 0.005,
      amtinEon: 0,
    },
    validationSchema: Yup.object({
      btc: Yup.number().required("Required").max(0.5).min(0.005),
      amtinEon: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      sendTransaction();
    },
  });
  const handleBtcChange = (event: any) => {
    const btcValue = parseFloat(event.target.value);
    const amtinEonValue = btcValue * 1e6;
    handleChange({
      target: {
        name: "btc",
        value: btcValue,
      },
    });
    handleChange({
      target: {
        name: "amtinEon",
        value: amtinEonValue,
      },
    });
  };

  const handleAmtinEonChange = (event: any) => {
    const amtinEonValue = parseFloat(event.target.value);
    const btcValue = amtinEonValue / 1e6;
    handleChange({
      target: {
        name: "btc",
        value: btcValue,
      },
    });
    handleChange({
      target: {
        name: "amtinEon",
        value: amtinEonValue,
      },
    });
  };
  const sendTransaction = async () => {
    // @ts-ignore
    let accounts = await window.unisat.requestAccounts();
    console.log(accounts);
    setAddress(accounts[0]);
    if (accounts[0] !== undefined && accounts[0] !== null) {
      try {
        // @ts-ignore
        let txid = await window.unisat.sendBitcoin(
          "tb1p6m2xcyk6sjqfxpmcrn4c722txkxe87uct08rw54rx56pfr22scmqpaguq7",
          values.btc * 1e6
        );
        toast.success("Transaction Success");
        console.log(txid);
        setTransactionHash(txid);
      } catch (e) {
        console.log(e);
        toast.error("Failed to send transaction");
      }
    } else {
      toast.error("Please Connect Wallet First");
    }
  };
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const targetDate = new Date("June 14, 2023");
    targetDate.setDate(targetDate.getDate() + 19);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = targetDate.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        const remainingSeconds = Math.floor(timeDifference / 1000);
        setRemainingTime(remainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const days = Math.floor(timeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
    const seconds = timeInSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="grid grid-cols-1 md:flex justify-center p-4  gap-4">
      <div className="flex flex-col rounded-lg shadow-orange-50 md:h-[480px] max-w-2xl items-start justify-center text-center bg-[#1E2834] p-6  md:p-8 gap-2">
        <h1 className="text-2xl font-black tracking-wider text-white">
          EON Token Sale Info
        </h1>
        <h1 className="text-base font-medium text-white">
          EON Token Sale Info
        </h1>
        <p
          className="bg-[#181F29] outline-none border-none placeholder-shown:text-white text-white p-3 rounded-md w-full"
        >
          {formatTime(remainingTime)}        </p>
        <p className="text-white text-base">
          Token Total Supply: 100,000,000
        </p>
        <p className="text-white   font-medium text-base">
          Presale Allocation: 10,000,000 (10%)
        </p>
        <p className="text-white   font-medium text-base">
          Presale Hardcap: 10 BTC
        </p>
        <p className="text-white  font-medium text-base">
          Token Price: 1 EONS = 0.000001 BTC
        </p>
        <p className="text-white text-base  font-medium">
          Minumum Buy: 0.005 BTC
        </p>
        <p className="text-white font-medium text-base">Maximum Buy: 0.5 BTC</p>
        <div className="w-full bg-[#181F29] rounded-full h-4">
          <div
            className="bg-[#0B111D] h-4 rounded-full"
            style={{
              width: "50%",
            }}
          ></div>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-white text-base  font-medium">10 BTC</p>
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
              type="number"
              name="btc"
              onChange={handleBtcChange}
              onBlur={handleBlur}
              value={values.btc}
              autoComplete="off"
              placeholder="Enter Amount Here ..."
              className={"bg-[#181F29] outline-none border-none no-spinners placeholder-shown:text-white text-white p-3 w-full " + (values.btc > 0.5 ? " border-red-500" : "")}
            />

            <Image
              src={"/assets/bitcoin.svg"}
              width={75}
              height={80}
              alt="notfound"
              className="cursor-pointer"
            />
          </div>
          {
            values.btc > 0.5 ? <p className="text-red-500 text-sm">Max 0.5 BTC</p> : values.btc < 0.005 ? <p className="text-red-500 text-sm">Min 0.005 BTC</p> : null
          }
          <div className="flex justify-between w-full ">
            <div className="w-full justify-end flex">
              <Image
                src={"/assets/below.svg"}
                width={20}
                height={10}
                alt="notfound"
              />
            </div>
            <div className="w-full justify-end flex">
              {balance ? <p className="text-white text-sm">Balance {balance} BTC
              </p> : null}
            </div> </div>
          <div className="flex w-full bg-[#181F29] rounded-md px-4">
            <input
              type="number"
              name="amtinEon"
              onChange={handleAmtinEonChange}
              onBlur={handleBlur}
              value={values.amtinEon}
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
          {
            values.btc > 0.5 ? <p className="text-red-500 text-sm">Max 0.5 BTC</p> : values.btc < 0.005 ? <p className="text-red-500 text-sm">Min 0.005 BTC</p> : null
          }
          <button
            type="submit"
            placeholder="Timer"
            className="bg-[#181F29] buy p-2.5 w-full"
          >
            Buy
          </button>
        </form>
        <div className="flex w-full flex-col text-left rounded-lg shadow-orange-50 items-start bg-[#1E2834] p-6 md:p-8 gap-2">
          <p className="text-white text-base text-left  font-medium break-all">
            Transaction Hash :
            {transactionHash === "" ? " No Transaction Yet " : transactionHash}
          </p>
          <span className="text-white text-left text-base font-medium">
            You will get <span className="text-sm">{values.btc <= 0.5 ? values.amtinEon.toFixed(2) : "0"}</span> EON Tokens once the presale ends
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
