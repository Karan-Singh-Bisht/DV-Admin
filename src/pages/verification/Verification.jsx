import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserVerifications } from "../../state/UserVerification/userVerificationSlice";

const Verification = () => {
  const [openMenuId, setOpenMenuId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state.userVerification.userVerifications
  );

  useEffect(() => {
    const fetchVerificationRequests = async () => {
      try {
        await dispatch(getAllUserVerifications());
      } catch (err) {
        console.error("Failed to fetch user verifications", err);
      }
    };
    fetchVerificationRequests();
  }, []);

  const handleMenuToggle = (userId) => {
    setOpenMenuId((prevId) => (prevId === userId ? null : userId));
  };

  const handleNavigate = (userId) => {
    navigate(`/verification/${userId}`);
  };

  const handleDelete = (userId) => {
    console.log("Delete page with ID:", userId);
    // Add your delete logic here
  };

  const handleApprove = (userId) => {
    console.log("Approve page with ID:", userId);
    // Add your delete logic here
  };

  const handleReject = (userId) => {
    console.log("Reject page with ID:", userId);
    // Add your delete logic here
  };

  const handleArchive = (userId) => {
    console.log("Archive page with ID:", userId);
    // Add your archive logic here
  };

  window.addEventListener("click", () => {
    setOpenMenuId(false);
  });

  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header pageName={pageName} title={"Users Hub"} />
      </div>
      <div className="overflow-x-auto p-4 bg-[#0d1028] relative mt-4 text-white">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#101338] text-white text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3 uppercase">User ID</th>
              <th className="p-3 uppercase">Request ID</th>
              <th className="p-3 uppercase">Selfie</th>
              <th className="p-3 uppercase">User Type</th>
              <th className="p-3 uppercase">Full Name</th>
              <th className="p-3 uppercase">Doc Type</th>
              <th className="p-3 uppercase">Phone Number</th>
              <th className="p-3 uppercase">Verified</th>
              <th className="p-3 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {userDetails?.map((userDetail, index) => (
              <tr
                onClick={() => handleNavigate(userDetail._id)}
                key={userDetail._id}
                className="border-b border-[#1a1e3f] hover:bg-[#1c2045] hover:cursor-pointer transition relative"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{userDetail?.user?._id}</td>
                <td className="p-3">{userDetail?._id}</td>
                <td className="p-3">
                  <img
                    src={
                      userDetail?.authorizedSelfie ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(userDetail.fullName)
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </td>
                <td className="p-3">Individual</td>
                <td className="p-3">{userDetail?.user?.username}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={userDetail.identityDocument}
                      className="object-cover w-10"
                      alt="aadharCard"
                    />
                  </div>
                </td>
                <td className="p-3">{userDetail?.user?.phoneNumber}</td>
                <td className="p-3">
                  {userDetail?.user?.isVerified ? (
                    <FaCheckCircle className="text-green-400" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                </td>
                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(userDetail.userId);
                    }}
                    className="cursor-pointer"
                  />
                  {openMenuId === userDetail.userId && (
                    <div className="absolute right-4 z-50 mt-2 w-32 bg-white text-black rounded shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(userDetail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(userDetail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                      >
                        Reject
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchive(userDetail.userId);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-[#2563EB]"
                      >
                        Archive
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(userDetail.userId);
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

export default Verification;
