import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePage } from "../state/Page/pageSlice";

const PageTable = ({ pages }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [visiblePages, setVisiblePages] = useState(pages || []);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [timeOutId, setTimeOutId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setVisiblePages(pages);
  }, [pages]);

  const handleMenuToggle = (id, e) => {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleNavigate = (id) => navigate(`/pages/${id}`);

  const handleDelete = (id) => {
    const deletedPage = visiblePages.find((page) => page._id === id);
    setVisiblePages((prev) => prev.filter((page) => page._id !== id));
    setRecentlyDeleted(deletedPage);
    setShowUndo(true);

    const timeout = setTimeout(() => {
      dispatch(deletePage(id));
      setShowUndo(false);
      setRecentlyDeleted(null);
    }, 5000);

    setTimeOutId(timeout);
  };

  const handleUndo = () => {
    if (recentlyDeleted) {
      clearTimeout(timeOutId);
      setVisiblePages((prev) => [recentlyDeleted, ...prev]);
      setRecentlyDeleted(null);
      setShowUndo(false);
    }
  };

  const handleArchive = (id) => {
    console.log("Archive page with ID:", id);
    // Add archive logic
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="overflow-x-auto p-4 bg-[#0d1028] relative mt-4 text-white">
      {showUndo && (
        <div className="w-full absolute top-2 left-0 z-50 flex justify-end px-4">
          <div className="bg-gray-800 px-4 py-2 rounded shadow-lg flex items-center gap-4 transition-all duration-300">
            <span>Page deleted.</span>
            <button
              onClick={handleUndo}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Undo
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-[#101338] text-white text-left">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3 uppercase">User ID</th>
            <th className="p-3 uppercase">Page ID</th>
            <th className="p-3 uppercase">Avatar</th>
            <th className="p-3 uppercase">Page Type</th>
            <th className="p-3 uppercase">Page Name</th>
            <th className="p-3 uppercase">User Name</th>
            <th className="p-3 uppercase">Category</th>
            <th className="p-3 uppercase">Verified</th>
            <th className="p-3 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {visiblePages?.map((page, index) => (
            <tr
              onClick={() => handleNavigate(page._id)}
              key={page._id}
              className="border-b border-[#1a1e3f] hover:bg-[#1c2045] hover:cursor-pointer transition relative"
            >
              <td className="p-3 text-gray-400">{index + 1}</td>
              <td className="p-3">{page.userId}</td>
              <td className="p-3">{page._id}</td>
              <td className="p-3">
                <img
                  src={
                    page.profileImg ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      page.fullName || "Page"
                    )}`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-md object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </td>
              <td className="p-3">{page.isCreator ? "Creator" : "Business"}</td>
              <td className="p-3">{page.pageName}</td>
              <td className="p-3 text-blue-400">@{page.userName}</td>
              <td className="p-3">{page.Category}</td>
              <td className="p-3">
                {page.isVerified ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
              </td>
              <td className="p-3 relative" onClick={(e) => e.stopPropagation()}>
                <BsThreeDotsVertical
                  onClick={(e) => handleMenuToggle(page._id, e)}
                  className="cursor-pointer"
                />
                {openMenuId === page._id && (
                  <div className="absolute right-4 z-50 mt-2 w-32 bg-white text-black rounded shadow-lg">
                    <button
                      onClick={() => handleDelete(page._id)}
                      className="block w-full px-4 py-2 text-left hover:bg-[#2563EB] hover:text-white"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleArchive(page._id)}
                      className="block w-full px-4 py-2 text-left hover:bg-[#2563EB] hover:text-white"
                    >
                      Archive
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PageTable;
