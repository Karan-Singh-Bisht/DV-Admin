import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreatorVerificationDetails = () => {
  const images = [
    { Selfie: "/vite.svg" },
    { Aadhar: "/picture.png" },
    { PanCard: "/tv.webp" },
  ];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const switchImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const pageDetails = [
    { label: "Page ID", value: "PAGE98765" },
    { label: "Page Type", value: "Creator" },
    { label: "Username", value: "alice_creator" },
    { label: "Full Name", value: "Alice Smith" },
    {
      label: "Document Type",
      value: "Aadhar Card (Masked), Pan Card (Masked)",
    },
    { label: "Phone Number", value: "+1 987 654 3210" },
    { label: "Email", value: "alice@example.com" },
    { label: "Link 1", value: "https://instagram.com/alice" },
    { label: "Link 2", value: "https://youtube.com/alice" },
    { label: "Link 3", value: "https://twitter.com/alice" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
        <div className="flex items-center gap-3">
          <IoMdArrowBack
            className="text-2xl hover:cursor-pointer hover:text-gray-800"
            onClick={() => navigate(-1)}
          />
          <span className="text-lg font-semibold">Page Verification</span>
        </div>
        <span className="text-lg font-bold text-blue-600">Admin Panel</span>
      </div>

      {/* Image & Details */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Left Image Section */}
        <div className="flex-1 flex flex-col relative items-center justify-center">
          <img
            src={Object.values(images[index])[0]}
            alt={`Verification ${index + 1}`}
            className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
          />
          <button
            onClick={switchImage}
            className={`mt-4 px-4 py-2 bg-gray-200 absolute right-2 bottom-0 hover:bg-gray-300 rounded`}
          >
            {Object.keys(images[index])[0]}
          </button>
        </div>

        {/* Right Details Section */}
        <div className="flex-1 flex flex-col w-full text-gray-800">
          <div className="grid grid-cols-1 gap-4 mt-4">
            {pageDetails.map((item, idx) => (
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
          <div className="flex gap-4 mt-6">
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
  );
};

export default CreatorVerificationDetails;
