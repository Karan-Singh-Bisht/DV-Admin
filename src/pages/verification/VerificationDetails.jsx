import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const VerificationDetails = () => {
  const images = {
    Selfie: "/vite.svg",
    Aadhar: "/picture.png",
    PanCard: "/tv.webp",
  };

  const [selectedImage, setSelectedImage] = useState("Selfie");
  const navigate = useNavigate();

  const userDetails = [
    { label: "userId", value: "12345" },
    { label: "userType", value: "Admin" },
    { label: "fullName", value: "John Doe" },
    { label: "phoneNumber", value: "+1 234 567 890" },
    { label: "email", value: "john.doe@example.com" },
    { label: "Verified", value: "Yes" },
    { label: "Created At", value: "01-05-2025" },
    { label: "Updated At", value: "05-05-2025" },
  ];

  const getIdentityImage = () => {
    if (images.Aadhar) return images.Aadhar;
    if (images.PanCard) return images.PanCard;
    return ""; // fallback
  };

  return (
    <div className="relative max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
        <div className="flex items-center gap-3">
          <IoMdArrowBack
            className="text-2xl hover:cursor-pointer hover:text-gray-800"
            onClick={() => navigate(-1)}
          />
          <span className="text-lg font-semibold">Verification Details</span>
        </div>
        <span className="text-lg font-bold text-blue-600">Karan</span>
      </div>

      {/* Image & Details */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Left Image Section */}
        <div className="flex-1 flex flex-col relative items-center justify-center w-full">
          <img
            src={
              selectedImage === "Selfie" ? images.Selfie : getIdentityImage()
            }
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
            {userDetails?.map((item, idx) => (
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
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Approve
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Reject
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Archive
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Delete
        </button>
      </div>
    </div>
  );
};

export default VerificationDetails;
