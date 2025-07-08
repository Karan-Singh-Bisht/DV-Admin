import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import InfocardTable from "./InfocardTable";
import InfocardGrid from "./InfocardGrid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllInfoCards } from "../../state/InfoCards/infoCardSlice";
import { IoSearchSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import Loader from "../../components/Loader";

const Infocard = () => {
  const location = useLocation();
  const pageName = location.pathname.slice(1);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.infoCard.infoCards);
  const [searchValue, setSearchValue] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [layout, setLayout] = useState("line");
  const { loading, error } = useSelector((state) => state.infoCard);

  useEffect(() => {
    const getInfoCards = async () => {
      const response = await dispatch(getAllInfoCards());
    };

    getInfoCards();
  }, [dispatch]);

  const filteredUsers = userInfo.filter((user) => {
    const matchesSearch =
      user?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.username?.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.mailAddress?.toLowerCase().includes(searchValue.toLowerCase());

    const matchesVerified =
      !verifiedFilter ||
      (verifiedFilter === "yes" && user?.isPrivate === true) ||
      (verifiedFilter === "no" && user?.isPrivate === false) ||
      (verifiedFilter === "pending" && user?.isPrivate === "pending");

    return matchesSearch && matchesVerified;
  });

  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Mapo Hub"}
          subtitle={"Welcome to Infocards Management"}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-6 gap-4 w-full">
        {/* Left Side: Search + Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex items-center bg-[#0F1535] text-white px-3 py-2 rounded-md border border-gray-700 w-full sm:w-[250px]">
            <IoSearchSharp className="mr-2 text-xl" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search Buddies"
              className="bg-transparent focus:outline-none w-full text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 w-full sm:w-auto">
            <select
              id="verified"
              onChange={(e) => setVerifiedFilter(e.target.value)}
              value={verifiedFilter}
              className="bg-[#0F1535] text-white px-4 py-2 rounded-md border border-gray-700 w-full sm:w-[120px]"
            >
              <option value="" disabled hidden>
                Verified
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="pending">Pending</option>
            </select>

            <select
              id="type"
              defaultValue=""
              className="bg-[#0F1535] text-white px-4 py-2 rounded-md border border-gray-700 w-full sm:w-[120px]"
            >
              <option value="" disabled hidden>
                User Type
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
          </div>
        </div>

        {/* Layout Toggle */}
        <div className="flex gap-3 text-white text-2xl">
          <CiGrid41
            onClick={() => setLayout("grid")}
            className={`cursor-pointer ${
              layout === "grid" ? "text-blue-400" : "text-white"
            } hover:text-blue-300 transition`}
          />
          <FaGripLines
            onClick={() => setLayout("line")}
            className={`cursor-pointer ${
              layout === "line" ? "text-blue-400" : "text-white"
            } hover:text-blue-300 transition`}
          />
        </div>
      </div>

      {/* Table/Grid View */}
      {loading ? (
        <Loader />
      ) : layout === "line" ? (
        <div className="mt-6">
          <InfocardTable userDetails={filteredUsers} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user, index) => (
            <InfocardGrid />
          ))}
        </div>
      )}
    </div>
  );
};

export default Infocard;
