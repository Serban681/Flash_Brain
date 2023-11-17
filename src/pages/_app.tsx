import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import FooterComponent from "@/components/GeneralComponents/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
};

export default MyApp;
