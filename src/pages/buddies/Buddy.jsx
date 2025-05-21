import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { IoSearchSharp } from "react-icons/io5";
import ProductTable from "../../components/ProductTable";
import { CiGrid41 } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import BuddyGridView from "../../components/BuddyGridView";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, createUserAvatar } from "../../state/User/userSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Buddy = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const { loading, error } = useSelector((state) => state.user);
  const [avatarUploadLoading, setAvatarUploadLoading] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await dispatch(getAllUsers());
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchAllUsers();
  }, [dispatch]);

  const location = useLocation();
  const pageName = location.pathname.slice(1);
  const [searchValue, setSearchValue] = useState("");
  const [layout, setLayout] = useState("line");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [category, setCategory] = useState("");

  const filteredUsers = users.filter((user) => {
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

  const handleFileChange = (e) => setAvatarFile(e.target.files[0]);
  const handleSubmit = async () => {
    if (!avatarFile) {
      alert("Please select a file");
      return;
    }

    try {
      setAvatarUploadLoading(true);
      const actionResult = await dispatch(
        createUserAvatar({
          category,
          file: avatarFile,
        })
      );

      if (actionResult.meta.requestStatus === "fulfilled") {
        console.log("Avatar uploaded successfully:", actionResult.payload);
        //Add Sonner Toast later
        setShowModal(false);
      } else {
        console.error("Failed to upload:", actionResult.error);
        alert("Failed to upload avatar. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setAvatarUploadLoading(false);
      setCategory("");
      setAvatarFile(null);
    }
  };
  return (
    <div className="p-4 min-h-screen text-white">
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-[#0F1535] p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">
              {avatarUploadLoading ? "Uploading" : "Upload User Avatar"}
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 w-full text-white"
            />
            <input
              type="text"
              placeholder="Enter avatar title"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 p-2 rounded bg-transparent border border-gray-700 text-white"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                disabled={avatarUploadLoading}
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                {avatarUploadLoading ? "Uploading" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <Header
          pageName={pageName}
          title={"Users Hub"}
          subtitle={"Welcome To Buddies"}
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 font-semibold rounded-lg w-full sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[10%]"
        >
          Add Avatar
        </button>
      </div>

      {/* Search and Filters */}
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
