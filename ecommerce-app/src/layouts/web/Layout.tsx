

import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header2";
import Footer from "./Footer";
import { useTrackVisitor } from "../../hooks/useTrackVisitor";


const WebLayout = () => {
  useTrackVisitor();
  const location = useLocation();
  return (
      <div className="">
        <main className={``}>
          <Header />
          <div className=""><Outlet key={location.pathname} /></div>
        </main>
        <Footer />
      </div>
  );
};

export default WebLayout;