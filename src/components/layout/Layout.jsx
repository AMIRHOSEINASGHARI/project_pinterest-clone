//* Components
import { Navbar } from "..";

const Layout = ({ children }) => {
  return (
    <section>
      <Navbar />
      <div className="max-w-[1400px] mx-auto p-3 xl:p-0">{children}</div>
    </section>
  );
};

export default Layout;
