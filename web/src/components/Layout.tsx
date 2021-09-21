import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div id="sidebar" className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
