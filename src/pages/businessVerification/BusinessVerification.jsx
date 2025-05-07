import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const businessDetails = [
  {
    pageId: "1",
    username: "acmecorp_official",
    pageName: "Acme Corporation",
    pageType: "Business",
    roleType: "Admin",
    selfie: "",
    fullName: "John Doe",
    phoneNumber: "9876543210",
    email: "contact@acme.com",
    aadhar: "/vite.svg",
    panCard: "",
    links: [
      "https://acme.com",
      "https://facebook.com/acme",
      "https://localhost:5050",
    ],
    verified: false,
  },
  // Add more as needed
];

const BusinessVerification = () => {
  const [openMenuId, setOpenMenuId] = useState(0);
  const navigate = useNavigate();

  const handleMenuToggle = (pageId) => {
    setOpenMenuId((prevId) => (prevId === pageId ? null : pageId));
  };

  const handleNavigate = (pageId) => {
    navigate(`/businessVerificationDetails/${pageId}`);
  };

  const handleDelete = (pageId) => {
    console.log("Delete business with ID:", pageId);
  };

  const handleApprove = (pageId) => {
    console.log("Approve business with ID:", pageId);
  };

  const handleReject = (pageId) => {
    console.log("Reject business with ID:", pageId);
  };

  const handleArchive = (pageId) => {
    console.log("Archive business with ID:", pageId);
  };

  window.addEventListener("click", () => {
    setOpenMenuId(false);
  });

  const location = useLocation();
  const pageName = location.pathname.slice(1);

  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Business Verification"}
          subtitle={"Welcome To Business Verification"}
        />
      </div>
      <div className="overflow-x-auto p-4 bg-[#0d1028] relative mt-4 text-white">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#101338] text-white text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3 uppercase">Page ID</th>
              <th className="p-3 uppercase">Page Type</th>
              <th className="p-3 uppercase">Username</th>
              <th className="p-3 uppercase">Page Name</th>
              <th className="p-3 uppercase">Doc Type</th>
              <th className="p-3 uppercase">Selfie</th>
              <th className="p-3 uppercase">Admin Name</th>
              <th className="p-3 uppercase">Role</th>
              <th className="p-3 uppercase">Phone</th>
              <th className="p-3 uppercase">Email</th>
              <th className="p-3 uppercase">Links</th>
              <th className="p-3 uppercase">Verified</th>
              <th className="p-3 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {businessDetails.map((detail, index) => (
              <tr
                key={detail.pageId}
                onClick={() => handleNavigate(detail.pageId)}
                className="border-b border-[#1a1e3f] hover:bg-[#1c2045] hover:cursor-pointer transition relative"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{detail.pageId}</td>
                <td className="p-3">{detail.pageType}</td>
                <td className="p-3">{detail.username}</td>
                <td className="p-3">{detail.pageName}</td>
                <td className="p-3">
                  {detail.aadhar ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        className="h-[3vw] w-[3vw]"
                        src={`${detail.aadhar}`}
                        alt="Aadhar"
                      />
                      <p className="text-sm">Aadhar</p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <img
                        className="h-[3vw] w-[3vw]"
                        src={`${detail.pan}`}
                        alt="pan"
                      />
                      <p>Pan</p>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <img
                    src={
                      detail.selfie ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        detail.fullName
                      )}`
                    }
                    alt="selfie"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </td>
                <td className="p-3">{detail.fullName}</td>
                <td className="p-3">{detail.roleType}</td>
                <td className="p-3">{detail.phoneNumber}</td>
                <td className="p-3">{detail.email}</td>
                <td className="p-3">
                  {detail.links?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {detail.links.slice(0, 3).map((link, i) => (
                        <li onClick={(e) => e.stopPropagation()} key={i}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                          >
                            Link {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400">No Links</span>
                  )}
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
                      handleMenuToggle(detail.userId);
                    }}
                    className="cursor-pointer"
                  />
                  {openMenuId === detail.userId && (
                    <div className="absolute right-4 z-50 mt-2 w-32 bg-white text-black rounded shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(detail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(detail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                      >
                        Reject
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(detail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                      >
                        Archive
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(detail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
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

export default BusinessVerification;
