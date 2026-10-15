import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

const Layout = () => {

  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className="pages_panel">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <main className={`container ${collapsed ? "collapsed" : ""}`}>

        <Header />

        <div className="page_content">
            <Outlet key={location.pathname} />
        </div>

      </main>

    </div>
  );
};

export default Layout;