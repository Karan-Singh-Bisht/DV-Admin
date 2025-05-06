import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import FeedsCard from "../../components/FeedsCard";

const Feeds = [
  {
    id: 1,
    username: "Karan",
    media: "/picture.png",
    category: "Any Thing",
    subCategory: "Religious",
    location: "Calicut",
    platform: "Instagram",
    description: "Test",
  },
  {
    id: 2,
    username: "Karan",
    media: "/picture.png",
    category: "Any Thing",
    subCategory: "Religious",
    location: "Calicut",
    platform: "Instagram",
    description: "Test",
  },
];

const Feed = () => {
  const search = useLocation();
  const pageName = search.pathname.slice(1);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-4 min-h-screen">
      {/* Header + Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Header pageName={pageName} title={"VisionFeed"} />
        <button className="bg-blue-500 text-white py-2 px-4 font-semibold rounded-lg w-full md:w-[20%] lg:w-[20%] xl:w-[10%]">
          Create Post
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row mt-6 gap-3 flex-wrap">
        {/* Search */}
        <div className="flex items-center bg-[#0F1535] text-white px-2 py-2 rounded-md w-full sm:w-[18%] border border-gray-700">
          <IoSearchSharp className="mr-2 text-lg" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full text-base sm:text-xl"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Verified Dropdown */}
          <select
            id="verified"
            defaultValue=""
            className="bg-[#0F1535] text-white px-3 py-2 rounded-md border border-gray-700"
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
            defaultValue=""
            className="bg-[#0F1535] text-white px-3 py-2 rounded-md border border-gray-700"
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

      {/* Table */}
      <div className="mt-6 overflow-x-auto flex gap-4">
        {Feeds.map((feed, index) => (
          <FeedsCard key={index} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
