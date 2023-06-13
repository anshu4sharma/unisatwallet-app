import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
const inter = Space_Grotesk({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <UserProvider>
        <Navbar />
        <Toaster />
        <Component {...pageProps} />
      </UserProvider>
    </main>
  );
}
