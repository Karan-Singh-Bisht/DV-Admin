import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const InfocardTable = ({ userDetails }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  const handleMenuToggle = (pageId) => {
    setOpenMenuId((prevId) => (prevId === pageId ? null : pageId));
  };

  const handleNavigate = (pageId) => {
    navigate(`/infocards/${pageId}`);
  };

  const handleDelete = (pageId) => {
    console.log("Delete page with ID:", pageId);
  };

  const handleArchive = (pageId) => {
    console.log("Archive page with ID:", pageId);
  };

  window.addEventListener("click", () => {
    setOpenMenuId(null);
  });

  return (
    <div>
      <div className="overflow-x-auto p-4 bg-[#0d1028] relative mt-4 text-white">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#101338] text-white text-left">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 uppercase">Page ID</th>
              <th className="p-3 uppercase">Avatar</th>
              <th className="p-3 uppercase">Photo</th>
              <th className="p-3 uppercase">Display Name</th>
              <th className="p-3 uppercase">Category</th>
              <th className="p-3 uppercase">Username</th>
              <th className="p-3 uppercase">Email</th>
              <th className="p-3 uppercase">Phone Number</th>
              <th className="p-3 uppercase">Bio</th>
              <th className="p-3 uppercase">Location</th>
              <th className="p-3 uppercase">Company/Institute</th>
              <th className="p-3 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userDetails?.map((userDetail) => (
              <tr
                key={userDetail._id}
                onClick={() => handleNavigate(userDetail._id)}
                className="border-b border-[#1a1e3f] hover:bg-[#1c2045] hover:cursor-pointer transition relative"
              >
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">{userDetail._id}</td>
                <td className="p-3">
                  <img
                    src={userDetail?.pageId?.profileImg}
                    alt="Avatar"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </td>
                <td className="p-3">
                  <img
                    src={userDetail?.photo}
                    alt="Photo"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </td>
                <td className="p-3">{userDetail.name}</td>
                <td className="p-3">{userDetail.category}</td>
                <td className="p-3">@{userDetail?.pageId?.pageName}</td>
                <td className="p-3">{userDetail.email}</td>
                <td className="p-3">{userDetail.phone}</td>
                <td className="p-3 truncate max-w-[150px]">{userDetail.bio}</td>
                <td className="p-3">Delhi</td>
                <td className="p-3">{userDetail.company}</td>
                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(userDetail._id);
                    }}
                    className="cursor-pointer"
                  />
                  {openMenuId === userDetail._id && (
                    <div className="absolute right-4 z-50 mt-2 w-32 bg-white text-black rounded shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(userDetail._id);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB] hover:text-white"
                      >
                        Archive
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(userDetail._id);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#EF4444] hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfocardTable;
