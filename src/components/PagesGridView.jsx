import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePage } from "../state/Page/pageSlice";

const PagesGridView = ({ page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [timeOutId, setTimeOutId] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent navigation
    setIsDeleted(true);
    setIsMenuOpen(false);

    // Auto delete after 5 seconds
    const timeOut = setTimeout(() => {
      dispatch(deletePage(page._id));
    }, 5000);
    setTimeOutId(timeOut);
  };

  const handleUndo = (e) => {
    e.stopPropagation(); // Prevent navigation
    clearTimeout(timeOutId);
    setIsDeleted(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent navigation
    setIsMenuOpen(!isMenuOpen);
  };

  // If deleted, show nothing or render placeholder
  if (isDeleted) {
    return (
      <div className="fixed bottom-4 left-0 w-full z-50 flex justify-center">
        <div className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg flex items-center gap-4">
          <span>Page deleted.</span>
          <button
            onClick={handleUndo}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Undo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      key={page._id}
      onClick={() => navigate(`/pages/${page._id}`)}
      className="relative bg-[#0F1535] border border-gray-700 rounded-xl p-4 shadow-md text-white w-full max-w-sm mx-auto hover:shadow-lg transition duration-300 ease-in-out"
    >
      {/* Top: ID & Location */}
      <div className="flex justify-between text-sm text-gray-400 mb-3 mr-5">
        <span>ID: {page._id}</span>
        <span>India</span>
      </div>

      <div className="flex justify-evenly">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full object-cover border border-gray-600"
            src={page?.profileImg}
            alt="Buddy Avatar"
          />
        </div>

        {/* Info */}
        <div className="space-y-1 text-center">
          <h1 className="text-lg font-semibold">{page?.pageName}</h1>
          <p className="text-sm text-gray-300">@{page?.userName}</p>
          <p className="text-sm">📞 {page?.Phone}</p>
          <p className="text-sm">
            {page?.isPrivate ? (
              <>
                ✅ <span className="text-green-400">Verified</span>
              </>
            ) : (
              <>
                <span className="text-red-400">Not Verified</span>
              </>
            )}
          </p>
          <p className="text-sm text-gray-400">
            Joined: {page?.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>

      {/* Action Menu */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <HiOutlineDotsVertical size={20} />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-[#1A203D] border border-gray-600 rounded-md shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Update page:", page._id);
                setIsMenuOpen(false);
              }}
            >
              Update
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesGridView;
