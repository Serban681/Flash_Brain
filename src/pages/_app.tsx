import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import FooterComponent from "@/components/GeneralComponents/Footer";
import Header from "@/components/GeneralComponents/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
      <FooterComponent />
    </div>
  );
};

export default MyApp;
