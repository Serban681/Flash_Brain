import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import FooterComponent from "@/components/GeneralComponents/Footer";
import Header from "@/components/GeneralComponents/Header";
import {GoogleOAuthProvider} from "@react-oauth/google";

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
      <GoogleOAuthProvider clientId="341894606122-skvs01vfcnl2rd26jn591ko81j1r1csj.apps.googleusercontent.com">
        <div>
          <Component {...pageProps} />
          <FooterComponent />
        </div>
      </GoogleOAuthProvider>
  );
};

export default MyApp;
