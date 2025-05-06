import { useLocation } from "react-router-dom";
import Header from "../../components/Header";

const Report = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Report"}
          subtitle={"Welcome To Report"}
        />
      </div>
    </div>
  );
};

export default Report;
