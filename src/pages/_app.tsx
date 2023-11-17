import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import FooterComponent from "@/components/GeneralComponents/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="app-styles">
      <Component {...pageProps} />
      <FooterComponent />
    </div>
  );
};

export default MyApp;
