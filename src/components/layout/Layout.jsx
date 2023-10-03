//* Components
import { Navbar } from "..";

const Layout = ({ children }) => {
  return (
    <section>
      <Navbar />
      <div className="p-3">{children}</div>
    </section>
  );
};

export default Layout;
