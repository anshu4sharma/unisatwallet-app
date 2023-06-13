// UserContext.tsx
import React, { createContext, useState } from "react";

interface UserContextType {
  address: string;
  balance: number;
  setAddress: (address: string) => void;
  setBalance: (balance: number) => void;
  isTestnet: boolean;
  setIsTestnet: (isTestnet: boolean) => void;
}

const initialUserContext: UserContextType = {
  address: "",
  balance: 0,
  setAddress: () => {},
  setBalance: () => {},
  isTestnet: false,
  setIsTestnet: () => {},
};

export const UserContext = createContext<UserContextType>(initialUserContext);

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [isTestnet, setIsTestnet] = useState(false);

  return (
    <UserContext.Provider
      value={{
        address,
        balance,
        setAddress,
        setBalance,
        isTestnet,
        setIsTestnet,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
