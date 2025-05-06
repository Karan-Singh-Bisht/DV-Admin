import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const BuddyGridView = ({ product }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

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

  return (
    <div
      key={product.id}
      className="relative bg-[#0F1535] border border-gray-700 rounded-xl p-4 shadow-md text-white w-full max-w-sm mx-auto hover:shadow-lg transition duration-300 ease-in-out"
    >
      {/* Top: ID & Location */}
      <div className="flex justify-between text-sm text-gray-400 mb-3 mr-5">
        <span>ID: 123</span>
        <span>Delhi, India</span>
      </div>

      <div className="flex justify-evenly">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full object-cover border border-gray-600"
            src="/tv.webp"
            alt="Buddy Avatar"
          />
        </div>

        {/* Info */}
        <div className="space-y-1 text-center">
          <h1 className="text-lg font-semibold">Karan Singh Bisht</h1>
          <p className="text-sm text-gray-300">@Karan</p>
          <p className="text-sm">📞 +91 123456789</p>
          <p className="text-sm">
            ✅ <span className="text-green-400">Verified</span>
          </p>
          <p className="text-sm text-gray-400">Joined: 01 May 2025</p>
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
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuddyGridView;
