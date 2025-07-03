import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSpecificUserVerification,
  approveUserVerificationRequest,
  rejectUserVerificationRequest,
} from "../../state/UserVerification/userVerificationSlice";
import Loader from "../../components/Loader";

const VerificationDetails = () => {
  const [selectedImage, setSelectedImage] = useState("Selfie");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRequestId } = useParams();

  const user = useSelector((state) => state.userVerification.userVerification);
  const userId = user?.user?._id;

  useEffect(() => {
    if (userRequestId) dispatch(getSpecificUserVerification(userRequestId));
  }, [userRequestId, dispatch]);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );
  }

  const handleApprove = async (userRequestId, userId) => {
    try {
      await dispatch(approveUserVerificationRequest({ userRequestId, userId }));
      alert("User verification approved successfully!");
    } catch (error) {
      console.error("Error approving user verification:", error);
      alert("Error approving user verification");
    }
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      alert("Rejection reason is required.");
      return;
    }

    dispatch(
      rejectUserVerificationRequest({
        id: userRequestId,
        reason: rejectionReason,
      })
    )
      .unwrap()
      .then(() => {
        alert("User verification rejected successfully!");
      })
      .catch((err) => {
        alert("Failed to reject verification: " + err);
      })
      .finally(() => {
        setShowRejectModal(false);
      });
  };

  const userDetails = [
    { label: "Request ID", value: user?._id },
    { label: "User ID", value: user?.user?._id },
    { label: "Username", value: user?.user?.username },
    { label: "Full Name", value: user?.user?.name },
    { label: "Phone Number", value: user?.user?.phoneNumber },
    { label: "Email", value: user?.user?.mailAddress },
    { label: "Verified", value: user?.user?.isVerified ? "Yes" : "No" },
    { label: "VerifiedBy", value: user?.reviewedBy?.username },
    {
      label: "Created At",
      value: new Date(user.createdAt).toLocaleDateString(),
    },
    {
      label: "Updated At",
      value: new Date(user.updatedAt).toLocaleDateString(),
    },
  ];

  const selfieUrl = user.authorizedSelfie;
  const identityDocUrl = user.identityDocument;

  const getSelectedImage = () => {
    return selectedImage === "Selfie" ? selfieUrl : identityDocUrl;
  };

  return (
    <div className="flex w-full h-[47vw] justify-center items-center p-4">
      <div className="w-full relative max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Verification Details</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{user.name}</span>
        </div>

        {/* Image & Details */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left Image Section */}
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <img
              src={getSelectedImage()}
              alt={selectedImage}
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setSelectedImage("Selfie")}
                className={`px-4 py-2 rounded ${
                  selectedImage === "Selfie"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Authorized Selfie
              </button>
              <button
                onClick={() => setSelectedImage("Identity")}
                className={`px-4 py-2 rounded ${
                  selectedImage === "Identity"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Identity Doc
              </button>
            </div>
          </div>

          {/* Right Details Section */}
          <div className="flex-1 flex flex-col w-full text-gray-800">
            <div className="grid grid-cols-1 gap-4 mt-4">
              {userDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between border-b pb-3"
                >
                  <div className="font-semibold w-1/2">{item.label}</div>
                  <div className="w-full sm:w-1/2 text-gray-700">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom Right */}
        <div className="absolute bottom-6 right-6 flex flex-wrap gap-3">
          <button
            onClick={() => handleApprove(userRequestId, userId)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reject
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Archive
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Delete
          </button>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Reject Verification
              </h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                rows={4}
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationDetails;
