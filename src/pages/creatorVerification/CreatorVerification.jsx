import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const creatorDetails = [
  {
    pageId: 1,
    pageType: "Creator",
    username: "creator_john",
    selfie: "",
    fullName: "John Doe",
    aadharCard: "/vite.svg",
    panCard: "",
    phoneNumber: "9876543210",
    email: "john@example.com",
    links: ["https://link1.com", "https://link2.com"],
    verified: false,
  },
  // Add more creators as needed
];

const CreatorVerification = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  const handleMenuToggle = (pageId) => {
    setOpenMenuId((prevId) => (prevId === pageId ? null : pageId));
  };

  const handleNavigate = (pageId) => {
    navigate(`/creatorVerificationDetails/${pageId}`);
  };

  const handleApprove = (pageId) => console.log("Approve", pageId);
  const handleReject = (pageId) => console.log("Reject", pageId);
  const handleArchive = (pageId) => console.log("Archive", pageId);
  const handleDelete = (pageId) => console.log("Delete", pageId);

  const Location = useLocation();
  const pageName = Location.pathname.slice(1);

  window.addEventListener("click", () => setOpenMenuId(null));

  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Creator Page Verification"}
          subtitle={"Welcome To Creator Page Verification"}
        />
      </div>
      <div className="overflow-x-auto p-4 bg-[#0d1028] text-white mt-4">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#101338] text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3 uppercase">Page ID</th>
              <th className="p-3 uppercase">Selfie</th>
              <th className="p-3 uppercase">Page Type</th>
              <th className="p-3 uppercase">Username</th>
              <th className="p-3 uppercase">Full Name</th>
              <th className="p-3 uppercase">Doc Type</th>
              <th className="p-3 uppercase">Phone</th>
              <th className="p-3 uppercase">Email</th>
              <th className="p-3 uppercase">Links</th>
              <th className="p-3 uppercase">Verified</th>
              <th className="p-3 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {creatorDetails.map((detail, index) => (
              <tr
                key={detail.pageId}
                onClick={() => handleNavigate(detail.pageId)}
                className="border-b border-[#1a1e3f] hover:bg-[#1c2045] cursor-pointer transition relative"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{detail.pageId}</td>
                <td className="p-3">
                  <img
                    src={
                      detail.selfie ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        detail.fullName
                      )}`
                    }
                    alt="Selfie"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </td>
                <td className="p-3">{detail.pageType}</td>
                <td className="p-3">{detail.username}</td>
                <td className="p-3">{detail.fullName}</td>
                <td className="p-3">
                  {detail.aadharCard ? (
                    <div className="flex items-center gap-2">
                      <span>Aadhar</span>
                      <img
                        src={detail.aadharCard}
                        alt="Aadhar"
                        className="w-10 h-10 rounded"
                      />
                    </div>
                  ) : detail.panCard ? (
                    <div className="flex items-center gap-2">
                      <span>PAN</span>
                      <img
                        src={detail.panCard}
                        alt="PAN"
                        className="w-10 h-10 rounded"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-400">No Document</span>
                  )}
                </td>
                <td className="p-3">{detail.phoneNumber}</td>
                <td className="p-3">{detail.email}</td>
                <td className="p-3">
                  <ul className="list-disc ml-4">
                    {detail.links.slice(0, 3).map((link, idx) => (
                      <li onClick={(e) => e.stopPropagation()} key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          Link {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">
                  {detail.verified ? (
                    <FaCheckCircle className="text-green-400" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                </td>
                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(detail.pageId);
                    }}
                    className="cursor-pointer"
                  />
                  {openMenuId === detail.pageId && (
                    <div className="absolute right-4 z-50 mt-2 w-32 bg-white text-black rounded shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(detail.pageId);
                        }}
                        className="block w-full px-4 py-2 hover:bg-blue-100"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(detail.pageId);
                        }}
                        className="block w-full px-4 py-2 hover:bg-blue-100"
                      >
                        Reject
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(detail.pageId);
                        }}
                        className="block w-full px-4 py-2 hover:bg-blue-100"
                      >
                        Archive
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(detail.pageId);
                        }}
                        className="block w-full px-4 py-2 hover:bg-blue-100"
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

export default CreatorVerification;
