import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import FeedsCard from "../../components/FeedsCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../../state/Feed/feedSlice";

const Feed = () => {
  const search = useLocation();
  const pageName = search.pathname.slice(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchAllFeeds = async () => {
      try {
        await dispatch(fetchFeeds());
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchAllFeeds(); // Call the function
  }, [dispatch]);

  const Feeds = useSelector((state) => state.feed.feeds);

  const filteredFeeds = Feeds.filter((feed) => {
    const matchesSearch =
      feed.usernameOrName.toLowerCase().includes(searchValue.toLowerCase()) ||
      feed.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      feed.categories.toLowerCase().includes(searchValue.toLowerCase()) ||
      feed.platform.toLowerCase().includes(searchValue.toLowerCase());

    const matchesPlatform =
      !platform ||
      (platform === "X" && feed.platform == "X") ||
      (platform === "instagram" && feed.platform == "Instagram") ||
      (platform === "facebook" && feed.platform == "Facebook") ||
      (platform === "devi" && feed.platform == "DeVi") ||
      (platform === "linkedin" && feed.platform == "Linkedin");

    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="p-4 min-h-screen">
      {/* Header + Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Header pageName={pageName} title={"VisionFeed"} />
        <button
          onClick={() => navigate("/feeds/create")}
          className="bg-blue-500 text-white py-2 px-4 font-semibold rounded-lg w-full md:w-[20%] lg:w-[20%] xl:w-[10%]"
        >
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
            onChange={(e) => setPlatform(e.target.value)}
            value={platform}
            className="bg-[#0F1535] text-white px-3 py-2 rounded-md border border-gray-700"
          >
            <option value="" disabled hidden>
              Platform
            </option>
            <option value="instagram">Instagram</option>
            <option value="X">X</option>
            <option value="devi">DeVi</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">Linkedin</option>
          </select>

          {/* Page Type Dropdown */}
          <select
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
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
      <div className="mt-6 overflow-x-auto flex gap-4 flex-wrap">
        {filteredFeeds.map((feed, index) => (
          <FeedsCard key={index} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
