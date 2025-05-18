import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../state/User/userSlice";

const ProductTable = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productList, setProductList] = useState(users);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [deletedItem, setDeletedItem] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [timeOutId, setTimeOutId] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setProductList(users);
  }, [users]);

  const handleMenuToggle = (id, event) => {
    event.stopPropagation();
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  const handleRedirect = (id) => navigate(`/users/${id}`);

  const handleDelete = (id, event) => {
    event.stopPropagation();
    const index = productList.findIndex((p) => p._id === id);
    const item = productList[index];
    setDeletedItem(item);
    setDeletedIndex(index);
    setShowUndo(true);
    setProductList((prev) => prev.filter((p) => p._id !== id));

    const timer = setTimeout(async () => {
      await dispatch(deleteUser(id));
      setShowUndo(false);
      setDeletedItem(null);
      setDeletedIndex(null);
    }, 5000);

    setTimeOutId(timer);
    setOpenMenuId(null);
  };

  const handleUndoDelete = () => {
    if (deletedItem !== null) {
      setProductList((prev) => {
        const updated = [...prev];
        updated.splice(deletedIndex, 0, deletedItem);
        return updated;
      });
      clearTimeout(timeOutId);
      setDeletedItem(null);
      setDeletedIndex(null);
      setShowUndo(false);
    }
  };

  const handleArchive = (id, event) => {
    event.stopPropagation();
    console.log("Archive user with ID:", id);
    setOpenMenuId(null);
  };

  return (
    <div className="overflow-x-auto p-4 bg-[#0d1028] mt-4 text-white">
      {showUndo && (
        <div className="mb-4 p-2 bg-yellow-500 text-black rounded flex justify-between items-center">
          <span>User deleted.</span>
          <button
            onClick={handleUndoDelete}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Undo
          </button>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-[#101338] text-white text-left">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3 uppercase">User ID</th>
            <th className="p-3 uppercase">Avatar</th>
            <th className="p-3 uppercase">User Type</th>
            <th className="p-3 uppercase">Full Name</th>
            <th className="p-3 uppercase">Nick Name</th>
            <th className="p-3 uppercase">Phone</th>
            <th className="p-3 uppercase">Verified</th>
            <th className="p-3 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr
              onClick={() => handleRedirect(product._id)}
              key={product._id}
              className="border-b border-[#1a1e3f] hover:bg-[#1c2045] cursor-pointer transition relative"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{product._id}</td>
              <td className="p-3">
                <img
                  src={
                    product.profileImg ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      product.name || "User"
                    )}`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-md object-cover"
                />
              </td>
              <td className="p-3">{product.userType || "Individual"}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3 text-blue-400">@{product.username}</td>
              <td className="p-3">{product.phoneNumber}</td>
              <td className="p-3">
                {product.isPrivate ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
              </td>
              <td className="p-3 relative" ref={menuRef}>
                <BsThreeDotsVertical
                  onClick={(e) => handleMenuToggle(product._id, e)}
                  className="cursor-pointer"
                />
                {openMenuId === product._id && (
                  <div className="absolute right-4 z-10 mt-2 w-32 bg-white text-black rounded shadow-lg">
                    <button
                      onClick={(e) => handleDelete(product._id, e)}
                      className="block w-full px-4 py-2 text-left hover:bg-[#2563EB] hover:text-white"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => handleArchive(product._id, e)}
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

export default ProductTable;
