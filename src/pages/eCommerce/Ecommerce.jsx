import { useLocation } from "react-router-dom";
import Header from "../../components/Header";

const Ecommerce = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Ecommerce"}
          subtitle={"Welcome To The Ecommerce"}
        />
      </div>
    </div>
  );
};

export default Ecommerce;
