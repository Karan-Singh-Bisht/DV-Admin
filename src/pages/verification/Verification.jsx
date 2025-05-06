import { useLocation } from "react-router-dom";
import Header from "../../components/Header";

const Verification = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Verification"}
          subtitle={"Welcome To Verification"}
        />
      </div>
    </div>
  );
};

export default Verification;
