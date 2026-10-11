import { Outlet } from "react-router-dom";
import Header from "./Header2";
// import { DataProvider } from "../../context/web/DataContext";
import Footer from "./Footer";
import { useTrackVisitor } from "../../hooks/useTrackVisitor";


const WebLayout = () => {
  useTrackVisitor();
  return (
    // <DataProvider> 
      <div className="">
        <main className={``}>
          <Header />
          <div className=""><Outlet key={location.pathname} /></div>
        </main>
        <Footer />
      </div>
    // </DataProvider> 
  );
};

export default WebLayout;