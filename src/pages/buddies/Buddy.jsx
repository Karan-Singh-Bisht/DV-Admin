import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { IoSearchSharp } from "react-icons/io5";
import ProductTable from "../../components/ProductTable";
import { CiGrid41 } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import BuddyGridView from "../../components/BuddyGridView";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../state/User/userSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Buddy = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const { loading, error } = useSelector((state) => state.user);

  console.log(users);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await dispatch(getAllUsers());
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchAllUsers(); // Call the function
  }, [dispatch]);

  const location = useLocation();
  const pageName = location.pathname.slice(1);
  const [searchValue, setSearchValue] = useState("");
  const [layout, setLayout] = useState("line");
  const [verifiedFilter, setVerifiedFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.mailAddress.toLowerCase().includes(searchValue.toLowerCase());

    const matchesVerified =
      !verifiedFilter ||
      (verifiedFilter === "yes" && user?.isPrivate == true) ||
      (verifiedFilter === "no" && user?.isPrivate == false) ||
      (verifiedFilter === "pending" && user?.isPrivate == "pending");

    // const matchesType =
    //   !typeFilter ||
    //   product?.userType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesVerified;
  });

  return (
    <div className="p-4 min-h-screen text-white">
      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <Header
          pageName={pageName}
          title={"Users Hub"}
          subtitle={"Welcome To Buddies"}
        />
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 font-semibold rounded-lg w-full sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[10%]">
          Add Avatar
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-6 gap-4 w-full">
        {/* Left Side: Search + Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Search Bar */}
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
      {loading ? (
        <Loader />
      ) : layout === "line" ? (
        <div className="mt-6">
          <ProductTable users={filteredUsers} layout={layout} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user, index) => (
            <BuddyGridView index={index} key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Buddy;
