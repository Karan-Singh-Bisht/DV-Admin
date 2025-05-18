import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { deleteUser } from "../state/User/userSlice";

const BuddyGridView = ({ user, index }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    setIsDeleted(true);
    setShowUndo(true);

    const timer = setTimeout(async () => {
      await dispatch(deleteUser(user._id));
      setShowUndo(false);
    }, 5000);

    setTimeoutId(timer);
    setIsMenuOpen(false);
  };

  const handleUndo = () => {
    clearTimeout(timeoutId);
    setIsDeleted(false);
    setShowUndo(false);
  };

  if (isDeleted) {
    return (
      showUndo && (
        <div className="bg-yellow-500 text-black p-3 rounded-md shadow-md flex justify-between items-center w-full max-w-sm mx-auto mt-4">
          <span>User deleted.</span>
          <button
            onClick={handleUndo}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Undo
          </button>
        </div>
      )
    );
  }

  return (
    <div className="relative bg-[#0F1535] border border-gray-700 rounded-xl p-4 shadow-md text-white w-full max-w-sm mx-auto hover:shadow-lg transition duration-300 ease-in-out">
      {/* Top: ID */}
      <div className="flex justify-between text-sm text-gray-400 mb-3 mr-5">
        <span>ID: {user._id}</span>
      </div>

      <div className="flex justify-evenly">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full object-cover border border-gray-600"
            src={
              user.profileImg ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user.name || "User")
            }
            alt="Buddy Avatar"
          />
        </div>

        {/* Info */}
        <div className="space-y-1 text-center">
          <h1 className="text-lg font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-300">@{user.username}</p>
          <p className="text-sm">📞 {user.phoneNumber}</p>
          <p className="text-sm">
            ✅ <span className="text-green-400">{user.isPrivate}</span>
          </p>
          <p className="text-sm text-gray-400">
            Joined: {user.createdAt?.slice(0, 10)}
          </p>
        </div>
      </div>

      {/* Action Menu */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <HiOutlineDotsVertical size={20} />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-[#1A203D] border border-gray-600 rounded-md shadow-lg z-10">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
              Update
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuddyGridView;
