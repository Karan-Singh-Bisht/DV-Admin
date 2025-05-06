import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  const handleRedirect = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Add your delete logic here
  };

  const handleArchive = (id) => {
    console.log("Archive user with ID:", id);
    // Add your archive logic here
  };

  window.addEventListener("click", () => {
    setOpenMenuId(false);
  });

  return (
    <div className="overflow-x-auto p-4 bg-[#0d1028] mt-4 text-white">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-[#101338] text-white text-left">
          <tr>
            <th className="p-3">
              <input type="checkbox" />
            </th>
            <th className="p-3 uppercase">User ID</th>
            <th className="p-3 uppercase">Avatar</th>
            <th className="p-3 uppercase">User Type</th>
            <th className="p-3 uppercase">Full Name</th>
            <th className="p-3 uppercase">Username</th>
            <th className="p-3 uppercase">Phone</th>
            <th className="p-3 uppercase">Verified</th>
            <th className="p-3 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              onClick={() => handleRedirect(product.id)}
              key={product.id}
              className="border-b border-[#1a1e3f] hover:bg-[#1c2045] hover:cursor-pointer transition relative"
            >
              <td className="p-3">
                <input type="checkbox" />
              </td>
              <td className="p-3">{product.id}</td>
              <td className="p-3">
                <img
                  src={
                    product.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(product.FullName)
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-md object-cover"
                />
              </td>
              <td className="p-3">{product.userType}</td>
              <td className="p-3">{product.FullName}</td>
              <td className="p-3 text-blue-400">@{product.UserName}</td>
              <td className="p-3">{product.Phone}</td>
              <td className="p-3">
                {product.Verified ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
              </td>
              <td className="p-3 relative">
                <BsThreeDotsVertical
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuToggle(product.id);
                  }}
                  className="cursor-pointer"
                />
                {openMenuId === product.id && (
                  <div className="absolute right-4 z-10 mt-2 w-32 bg-white text-black rounded shadow-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArchive(product.id);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
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
