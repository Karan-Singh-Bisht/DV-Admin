import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BusinessVerificationDetails = () => {
  const navigate = useNavigate();

  const images = {
    selfie: "/vite.svg",
    businessPhoto: "/business-photo.png",
    documents: ["/vite.svg", "/masked-pan.png"].filter(Boolean),
  };

  const [selectedImage, setSelectedImage] = useState("selfie");

  const getImageSrc = () => {
    if (selectedImage === "selfie") return images.selfie;
    if (selectedImage === "businessPhoto") return images.businessPhoto;
    if (selectedImage === "businessDoc") {
      // Find the incorporation document if it exists
      const incorporationDoc = images.documents.find((doc) =>
        doc.toLowerCase().includes("incorporation")
      );

      // Return incorporation doc if found, otherwise fall back to the first available document
      return (
        incorporationDoc ||
        (images.documents.length > 0 ? images.documents[0] : "")
      );
    }
    return "";
  };

  const businessDetails = [
    { label: "Page ID", value: "BUS12345" },
    { label: "Page Type", value: "Business" },
    { label: "Username", value: "biz_brand101" },
    { label: "Page Name", value: "Biz Brand Pvt. Ltd." },
    {
      label: "Document Type",
      value: "Incorporation Certificate, Start India, Pan Card (Masked)",
    },
    { label: "Admin Full Name", value: "Rahul Verma" },
    { label: "Role Type", value: "Founder & CEO" },
    { label: "Phone Number", value: "+91 99887 77665" },
    { label: "Email", value: "rahul@bizbrand.com" },
    { label: "Link 1", value: "https://bizbrand.com" },
    { label: "Link 2", value: "https://linkedin.com/company/bizbrand" },
    { label: "Link 3", value: "https://instagram.com/bizbrand" },
  ];

  return (
    <div className="flex w-full justify-center items-center p-4 h-[47vw]">
      <div className="w-full max-w-8xl bg-white relative rounded-xl shadow-md p-6 mt-2">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Business Verification</span>
          </div>
          <span className="text-lg font-bold text-blue-600">Admin Panel</span>
        </div>

        {/* Image & Details */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left Image Section */}
          <div className="flex-1 flex flex-col relative items-center justify-center">
            <img
              src={getImageSrc()}
              alt="Verification"
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
            <div className="mt-4 flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setSelectedImage("selfie")}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedImage === "selfie"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Authorized Selfie
              </button>
              <button
                onClick={() => setSelectedImage("businessPhoto")}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedImage === "businessPhoto"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Business Photo
              </button>
              <button
                onClick={() => setSelectedImage("businessDoc")}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedImage === "businessDoc"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Business Doc
              </button>
            </div>
          </div>

          {/* Right Details Section */}
          <div className="flex-1 flex flex-col w-full text-gray-800">
            <div className="grid grid-cols-1 gap-4 mt-4">
              {businessDetails.map((item, idx) => (
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

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 justify-end">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Approve
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Reject
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Archive
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVerificationDetails;
