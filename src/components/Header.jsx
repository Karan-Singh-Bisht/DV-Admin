import { FaHome } from "react-icons/fa";

const Header = ({ pageName, title, subtitle }) => {
  return (
    <div className="w-full px-2 py-2">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center text-white">
        <h1 className="font-semibold text-xl md:text-2xl capitalize">
          {title}
        </h1>
        <h1 className="font-base opacity-50 text-xl md:text-2xl hidden md:block">
          |
        </h1>
        <div className="flex gap-2 items-center">
          <FaHome className="text-lg md:text-xl" />
          <h1 className="text-lg md:text-xl font-base capitalize">
            {pageName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
