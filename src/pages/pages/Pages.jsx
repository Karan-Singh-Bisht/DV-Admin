import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import PageTable from "../../components/PageTable";
import PagesGridView from "../../components/PagesGridView";
import { useDispatch, useSelector } from "react-redux";
import { getAllPages } from "../../state/Page/pageSlice";
import Loader from "../../components/Loader";

const Pages = () => {
  const location = useLocation();
  const pageName = location.pathname.slice(1);
  const [searchValue, setSearchValue] = useState("");
  const [layout, setLayout] = useState("line");
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.page.pages);
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { loading, error } = useSelector((state) => state.page);

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.pageName?.toLowerCase().includes(searchValue.toLowerCase()) ||
      page.UserName?.toLowerCase().includes(searchValue.toLowerCase()) ||
      page.Category?.toLowerCase().includes(searchValue.toLowerCase());

    const matchesVerified =
      !verifiedFilter ||
      (verifiedFilter === "yes" && page.isPrivate == true) ||
      (verifiedFilter === "no" && page.isPrivate == false) ||
      (verifiedFilter === "pending" && page.isActive == "pending");

    // const matchesType =
    //   !typeFilter || page.pageType?.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesVerified;
  });

  useEffect(() => {
    const allPages = async () => {
      try {
        await dispatch(getAllPages());
      } catch (err) {
        toast(err, { style: { background: "red" } });
        console.error(err);
      }
    };
    allPages();
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-4 min-h-screen text-white">
      {/* Header and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Header
          pageName={pageName}
          title={"Users Hub"}
          subtitle={"Welcome To Pages"}
        />
        <button className="bg-blue-500 text-white py-2 px-4 font-semibold rounded-xl whitespace-nowrap">
          Add Page Avatar
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row mt-4 items-stretch sm:items-center gap-4 sm:gap-2 justify-between">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Input */}
          <div className="flex items-center bg-[#0F1535] text-white px-2 py-2 rounded-md border border-gray-700 w-full sm:w-[250px]">
            <IoSearchSharp className="mr-2 text-lg" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search Pages"
              className="bg-transparent focus:outline-none w-full text-base"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex gap-2">
            {/* Verified Dropdown */}
            <select
              id="verified"
              value={verifiedFilter}
              onChange={(e) => setVerifiedFilter(e.target.value)}
              className="bg-[#0F1535] text-white p-2 rounded-md border border-gray-700 w-[120px]"
            >
              <option value="" disabled hidden>
                Verified
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="pending">Pending</option>
            </select>

            {/* Page Type Dropdown */}
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#0F1535] text-white p-2 rounded-md border border-gray-700 w-[120px]"
            >
              <option value="" disabled hidden>
                Page Type
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
          </div>
        </div>

        {/* Layout toggle */}
        <div className="flex gap-3 text-2xl text-white">
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

      {/* Layout View */}
      {layout === "line" ? (
        <div className="mt-6">
          <PageTable pages={filteredPages} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPages.map((page) => (
            <PagesGridView key={page.id} page={page} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pages;
