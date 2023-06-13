import Hero from "@/components/Hero";
import React from "react";

const Index = () => {
  return (
    <div className="">
      <div className="flex flex-col text-center">
        <h1 className="text-4xl font-black text-white">Token Sale</h1>
        <p className="text-white font-semibold text-base mt-4">
          Home {" > "} 
          <span className="text-[#7eb863] font-semibold">Token Sale</span>
        </p>
      </div>
      <Hero />
    </div>
  );
};

export default Index;
